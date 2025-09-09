// utils/maintenance.ts

export type MaintenanceWindow = {
    day: "ALL" | number; // internally still number (0-6) or ALL
    start: number;
    end: number;
};

// Map of day prefixes to JS getDay() values
const DAY_MAP: Record<string, number> = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
};

/**
 * Convert "HH:MM" -> total minutes from midnight
 */
function toMinutes(str: string): number {
    const [h, m] = str.split(":").map(Number);
    return h * 60 + m;
}

/**
 * Parse a configuration string into maintenance windows.
 * Example:
 *   "ALL:01:00-03:00|SUN:00:30-12:30|FRI:23:00-02:00"
 */
export function parseWindows(config?: string): MaintenanceWindow[] {
    if (!config) throw new Error("No maintenance window configuration provided");
    return config
        .split("|")
        .map((entry) => {
            const [dayStr, range] = entry.split("::");
            if (!range) return null;

            const [startStr, endStr] = range.split("-");
            if (!startStr || !endStr) return null;

            const day =
                dayStr === "ALL"
                    ? "ALL"
                    : DAY_MAP[dayStr.toUpperCase()] ?? null;

            if (day === null) return null;

            return {
                day,
                start: toMinutes(startStr),
                end: toMinutes(endStr),
            };
        })
        .filter(Boolean) as MaintenanceWindow[];
}

/**
 * Check if current time is inside any maintenance window
 */
export function isBlockedTime(
    windows: MaintenanceWindow[] = parseWindows(process.env.NEXT_PUBLIC_MAINTENANCE_WINDOWS)
): boolean {
    const now = new Date();
    const day = now.getDay();
    const totalMinutes = now.getHours() * 60 + now.getMinutes();
    return windows.some((w) => {
        if (w.day === "ALL" || w.day === day) {
            if (w.start <= w.end) {
                // Normal window (e.g., 01:00–05:00)
                return totalMinutes >= w.start && totalMinutes < w.end;
            } else {
                // Wraps past midnight (e.g., 23:00–02:00)
                return totalMinutes >= w.start || totalMinutes < w.end;
            }
        }
        return false;
    });
}

/**
 * Get end time of the current maintenance window
 */
export function getMaintenanceEnd(
    windows: MaintenanceWindow[] = parseWindows(process.env.NEXT_PUBLIC_MAINTENANCE_WINDOWS)
): Date | null {
    const now = new Date();
    const day = now.getDay();
    const totalMinutes = now.getHours() * 60 + now.getMinutes();

    for (const w of windows) {
        if (w.day === "ALL" || w.day === day) {
            if (w.start <= w.end) {
                if (totalMinutes >= w.start && totalMinutes < w.end) {
                    const end = new Date(now);
                    end.setHours(Math.floor(w.end / 60), w.end % 60, 0, 0);
                    return end;
                }
            } else {
                // Window wraps past midnight
                if (totalMinutes >= w.start || totalMinutes < w.end) {
                    const end = new Date(now);
                    if (totalMinutes < w.end) {
                        end.setHours(Math.floor(w.end / 60), w.end % 60, 0, 0);
                    } else {
                        end.setDate(end.getDate() + 1);
                        end.setHours(Math.floor(w.end / 60), w.end % 60, 0, 0);
                    }
                    return end;
                }
            }
        }
    }
    return null;
}
