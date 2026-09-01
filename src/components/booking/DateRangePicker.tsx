"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import {
  addDays,
  addMonths,
  formatShortDate,
  getMonthGrid,
  isSameDay,
  parseISODate,
  startOfDay,
  toISODate,
  WEEKDAY_LABELS,
} from "@/lib/date-utils";
import { MOCK_BOOKED_DATES } from "@/lib/mock-booked-dates";
import { usePopover } from "@/lib/use-popover";
import { cn } from "@/lib/utils";

export function DateRangePicker({
  checkIn,
  checkOut,
  onChange,
  variant = "light",
  align = "left",
  className = "",
  bookedDates,
}: {
  checkIn: string;
  checkOut: string;
  onChange: (checkIn: string, checkOut: string) => void;
  variant?: "light" | "dark";
  align?: "left" | "right";
  className?: string;
  /** ISO (YYYY-MM-DD) dates that are unavailable. Defaults to generic demo
   * data when omitted (e.g. the homepage search bar, which isn't tied to a
   * specific listing yet); pass a real per-listing set on the booking card. */
  bookedDates?: string[];
}) {
  const { open, setOpen, ref } = usePopover<HTMLDivElement>();
  const isDark = variant === "dark";

  const bookedSet = useMemo(() => new Set(bookedDates ?? MOCK_BOOKED_DATES), [bookedDates]);

  function isDateBooked(date: Date): boolean {
    return bookedSet.has(toISODate(date));
  }

  function rangeContainsBooked(start: Date, end: Date): boolean {
    let cursor = addDays(start, 1);
    while (cursor.getTime() < end.getTime()) {
      if (isDateBooked(cursor)) return true;
      cursor = addDays(cursor, 1);
    }
    return false;
  }

  const today = useMemo(() => startOfDay(new Date()), []);
  const checkInDate = useMemo(() => parseISODate(checkIn), [checkIn]);
  const checkOutDate = useMemo(() => parseISODate(checkOut), [checkOut]);

  const [baseMonth, setBaseMonth] = useState(() =>
    addMonths(checkInDate ?? today, 0),
  );
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const nights =
    checkInDate && checkOutDate
      ? Math.round(
          (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
        )
      : 0;

  function handleSelectDate(date: Date) {
    if (!checkInDate || checkOutDate) {
      onChange(toISODate(date), "");
      return;
    }

    if (date.getTime() <= checkInDate.getTime()) {
      onChange(toISODate(date), "");
      return;
    }

    if (rangeContainsBooked(checkInDate, date)) {
      onChange(toISODate(date), "");
      return;
    }

    onChange(toISODate(checkInDate), toISODate(date));
    setOpen(false);
  }

  function openPicker() {
    if (!open) setBaseMonth(addMonths(checkInDate ?? today, 0));
    setOpen(true);
  }

  // Keep the popover fully within the viewport: flip it above the trigger
  // when there isn't enough room below (common on shorter laptop screens or
  // when the widget sits low on the page), and cap its height with an
  // internal scroll as a safety net for cases where neither direction has
  // enough space (e.g. a short mobile viewport).
  const MARGIN = 16;
  // Below this much room, flipping to the other side is worth it (if that
  // side genuinely has more space) — but the final height is always capped
  // to whatever room actually exists, never forced past it.
  const FLIP_THRESHOLD = 280;
  const ABSOLUTE_MIN_HEIGHT = 200;
  const [placement, setPlacement] = useState<{ vertical: "down" | "up"; maxHeight: number }>({
    vertical: "down",
    maxHeight: 520,
  });

  useEffect(() => {
    if (!open) return;

    function updatePlacement() {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const spaceBelow = window.innerHeight - rect.bottom - MARGIN;
      const spaceAbove = rect.top - MARGIN;
      const vertical = spaceBelow < FLIP_THRESHOLD && spaceAbove > spaceBelow ? "up" : "down";
      const available = vertical === "up" ? spaceAbove : spaceBelow;

      setPlacement({ vertical, maxHeight: Math.max(available, ABSOLUTE_MIN_HEIGHT) });
    }

    updatePlacement();
    window.addEventListener("resize", updatePlacement);
    window.addEventListener("scroll", updatePlacement, true);
    return () => {
      window.removeEventListener("resize", updatePlacement);
      window.removeEventListener("scroll", updatePlacement, true);
    };
  }, [open, ref]);

  return (
    <div ref={ref} className={cn("relative flex gap-2 sm:gap-3", className)}>
      <DateTriggerField
        label="Check-in"
        value={checkInDate ? formatShortDate(checkInDate) : ""}
        isDark={isDark}
        onClick={openPicker}
      />
      <DateTriggerField
        label="Check-out"
        value={checkOutDate ? formatShortDate(checkOutDate) : ""}
        isDark={isDark}
        onClick={openPicker}
      />

      {open && (
        <div
          style={{ maxHeight: placement.maxHeight }}
          className={cn(
            "absolute z-50 flex w-80 max-w-[calc(100vw-2.5rem)] flex-col rounded-2xl border border-zinc-100 bg-white text-zinc-900 shadow-2xl sm:w-160",
            placement.vertical === "up" ? "bottom-full mb-2" : "top-full mt-2",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          {/* Only the calendar grid scrolls — the legend/Done footer below
              stays pinned in view, since on short mobile viewports the full
              popover doesn't always fit and a hidden, unreachable Done
              button read as the picker being broken rather than scrollable. */}
          <div className="min-h-0 flex-1 overflow-y-auto p-5 pb-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <MonthCalendar
                year={baseMonth.getFullYear()}
                month={baseMonth.getMonth()}
                today={today}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                hoveredDate={hoveredDate}
                bookedSet={bookedSet}
                onHoverDate={setHoveredDate}
                onSelectDate={handleSelectDate}
                onPrev={() => setBaseMonth((m) => addMonths(m, -1))}
                canGoPrev={
                  addMonths(baseMonth, 0).getTime() > addMonths(today, 0).getTime()
                }
              />
              <div className="hidden sm:block">
                <MonthCalendar
                  year={addMonths(baseMonth, 1).getFullYear()}
                  month={addMonths(baseMonth, 1).getMonth()}
                  today={today}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  hoveredDate={hoveredDate}
                  bookedSet={bookedSet}
                  onHoverDate={setHoveredDate}
                  onSelectDate={handleSelectDate}
                  onNext={() => setBaseMonth((m) => addMonths(m, 1))}
                  isSecondMonth
                />
              </div>
            </div>

            {/* Mobile-only next-month control, since only one month renders below sm. */}
            <button
              type="button"
              onClick={() => setBaseMonth((m) => addMonths(m, 1))}
              className="mt-2 inline-flex items-center gap-1 pb-4 text-xs font-semibold text-brand-green sm:hidden"
            >
              Next month
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-t border-zinc-100 p-5">
            <div className="flex items-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-green" aria-hidden />
                Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full border border-zinc-300 bg-white" aria-hidden />
                Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" aria-hidden />
                Booked
              </span>
            </div>

            <div className="flex items-center gap-3">
              {nights > 0 && (
                <span className="text-xs font-semibold text-zinc-700">
                  {nights} {nights === 1 ? "night" : "nights"}
                </span>
              )}
              {(checkInDate || checkOutDate) && (
                <button
                  type="button"
                  onClick={() => onChange("", "")}
                  className="text-xs font-semibold text-zinc-500 underline underline-offset-2 hover:text-zinc-700"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-brand-green px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-green-dark"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DateTriggerField({
  label,
  value,
  isDark,
  onClick,
}: {
  label: string;
  value: string;
  isDark: boolean;
  onClick: () => void;
}) {
  const isEmpty = !value;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full min-w-0 flex-1 items-center gap-1.5 rounded-lg px-3 py-3 text-left sm:gap-3 sm:px-4 sm:py-3.5",
        isDark
          ? "border border-white/15 bg-white/5"
          : "bg-[#F6F7F9]",
      )}
    >
      <span
        className={cn(
          "flex-1 truncate text-sm font-medium sm:text-base",
          isEmpty ? (isDark ? "text-white/60" : "text-zinc-500") : isDark ? "text-white" : "text-zinc-900",
        )}
      >
        {value || label}
      </span>
      <CalendarDays
        className={cn("h-4 w-4 shrink-0 sm:h-5 sm:w-5", isDark ? "text-white/70" : "text-brand-green")}
        aria-hidden
      />
    </button>
  );
}

function MonthCalendar({
  year,
  month,
  today,
  checkInDate,
  checkOutDate,
  hoveredDate,
  bookedSet,
  onHoverDate,
  onSelectDate,
  onPrev,
  onNext,
  canGoPrev = true,
  isSecondMonth = false,
}: {
  year: number;
  month: number;
  today: Date;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  hoveredDate: Date | null;
  bookedSet: Set<string>;
  onHoverDate: (date: Date | null) => void;
  onSelectDate: (date: Date) => void;
  onPrev?: () => void;
  onNext?: () => void;
  canGoPrev?: boolean;
  isSecondMonth?: boolean;
}) {
  const cells = useMemo(() => getMonthGrid(year, month), [year, month]);
  const monthLabel = new Date(year, month, 1).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const previewEnd =
    checkInDate && !checkOutDate && hoveredDate && hoveredDate.getTime() > checkInDate.getTime()
      ? hoveredDate
      : null;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        {!isSecondMonth ? (
          <button
            type="button"
            onClick={onPrev}
            disabled={!canGoPrev}
            aria-label="Previous month"
            className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
        ) : (
          <span className="h-7 w-7 sm:hidden" aria-hidden />
        )}

        <p className="text-sm font-semibold text-zinc-900">{monthLabel}</p>

        {isSecondMonth ? (
          <button
            type="button"
            onClick={onNext}
            aria-label="Next month"
            className="hidden h-7 w-7 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 sm:flex"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        ) : (
          <span className="h-7 w-7" aria-hidden />
        )}
      </div>

      <div className="grid grid-cols-7 text-center text-xs font-medium text-zinc-400">
        {WEEKDAY_LABELS.map((day) => (
          <div key={day} className="py-1.5">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((date, idx) => {
          if (!date) return <div key={`empty-${idx}`} className="h-10" aria-hidden />;

          const isPast = startOfDay(date).getTime() < today.getTime();
          const booked = bookedSet.has(toISODate(date));
          const disabled = isPast || booked;

          const isCheckIn = checkInDate ? isSameDay(date, checkInDate) : false;
          const isCheckOut = checkOutDate ? isSameDay(date, checkOutDate) : false;
          const isEndpoint = isCheckIn || isCheckOut;

          const inConfirmedRange =
            checkInDate &&
            checkOutDate &&
            date.getTime() > checkInDate.getTime() &&
            date.getTime() < checkOutDate.getTime();

          const inPreviewRange =
            checkInDate &&
            previewEnd &&
            date.getTime() > checkInDate.getTime() &&
            date.getTime() <= previewEnd.getTime();

          const inRange = inConfirmedRange || inPreviewRange;

          return (
            <div
              key={toISODate(date)}
              className={cn(
                "flex h-10 items-center justify-center",
                inRange && "bg-emerald-50",
                isCheckIn && "rounded-l-full bg-emerald-50",
                isCheckOut && "rounded-r-full bg-emerald-50",
              )}
            >
              <button
                type="button"
                disabled={disabled}
                onClick={() => onSelectDate(date)}
                onMouseEnter={() => onHoverDate(date)}
                onMouseLeave={() => onHoverDate(null)}
                title={booked ? "Unavailable" : undefined}
                data-date={toISODate(date)}
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm transition-colors sm:h-9 sm:w-9",
                  disabled && "cursor-not-allowed text-zinc-300",
                  booked && "line-through decoration-zinc-300",
                  !disabled && !isEndpoint && "text-zinc-700 hover:bg-zinc-100",
                  isEndpoint && "bg-brand-green font-semibold text-white",
                )}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
