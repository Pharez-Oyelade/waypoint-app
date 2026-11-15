import Image from "next/image";
import {
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Banknote,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const destinations = [
  {
    label: "Tokyo, Japan",
    value: "tokyo",
  },
  {
    label: "Paris, France",
    value: "paris",
  },
  {
    label: "New York, USA",
    value: "new-york",
  },
  {
    label: "Sydney, Australia",
    value: "sydney",
  },
  {
    label: "Rio de Janeiro, Brazil",
    value: "rio-de-janeiro",
  },
  {
    label: "Rome, Italy",
    value: "rome",
  },
  {
    label: "Bali, Indonesia",
    value: "bali",
  },
];

export default function Hero({
  destination,
  setDestination,
  dateRange,
  setDateRange,
  budget,
  setBudget,
  destinationOpen,
  setDestinationOpen,
  datePickerOpen,
  setDatePickerOpen,
  travelersOpen,
  setTravelersOpen,
  budgetOpen,
  setBudgetOpen,
  totalGuests,
  adults,
  setAdults,
  children,
  setChildren,
}: any) {
  return (
    <section className="relative flex min-h-svh lg:h-svh flex-col items-center justify-between px-4 pt-20 sm:pt-24 lg:pt-24 pb-8 sm:pb-12 lg:pb-14">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center my-auto">
        {/* Text block */}
        <div className="text-center flex flex-col items-center shrink-0">
          <h1 className="text-[2.65rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-semibold font-sans tracking-tight leading-[1.08]">
            Plan together. <br /> Travel further.
          </h1>

          <p className="text-base sm:text-lg max-w-[580px] mx-auto mt-4 text-slate-600 dark:text-slate-300 leading-relaxed px-2 sm:px-0">
            Waypoint turns messy group chats into one shared itinerary with AI
            that suggests routes and budget for everyone.
          </p>

          <div className="flex w-full max-w-xs flex-col items-center justify-center gap-3 mx-auto mt-6 sm:max-w-none sm:flex-row sm:gap-3.5 sm:mt-7">
            <Button
              variant="default"
              size="lg"
              className="w-full sm:w-auto h-12 px-7 sm:px-8 text-sm sm:text-base font-semibold shadow-md shadow-primary/25 rounded-full"
            >
              Start planning
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-12 px-7 sm:px-8 text-sm sm:text-base font-semibold rounded-full"
            >
              Watch how it works
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full flex items-center justify-center mt-6 sm:mt-7 lg:mt-6 px-0 sm:px-2">
          <div className="relative w-[114%] -mx-[7%] sm:w-full sm:mx-auto max-w-[500px] sm:max-w-2xl lg:max-w-5xl flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-primary/5 to-transparent rounded-full blur-2xl -z-10 scale-95" />
            <Image
              src="/images/waypoint.png"
              alt="Waypoint travel companion"
              width={2312}
              height={894}
              className="w-full h-auto max-h-[35svh] sm:max-h-[40svh] lg:max-h-[46svh] object-contain drop-shadow-md"
              priority
            />
          </div>
        </div>

        {/* Options Selection Bar */}
        <div className="relative z-20 w-full max-w-[1040px] mx-auto -mt-6 sm:-mt-8 lg:-mt-10 px-2 sm:px-4">
          <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl md:rounded-full shadow-2xl shadow-slate-200/70 dark:shadow-slate-950/70 p-3 md:pl-6 md:pr-3 md:py-2 md:h-[84px] flex flex-col md:flex-row md:items-center justify-between gap-2.5 md:gap-1">
            {/* Destination */}
            <div className="flex-1 min-w-0">
              <Popover open={destinationOpen} onOpenChange={setDestinationOpen}>
                <PopoverTrigger className="w-full flex flex-col items-start gap-0.5 px-4 py-2 rounded-2xl md:rounded-full hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors cursor-pointer text-left outline-none group border-0 bg-transparent">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <MapPin className="w-4 h-4" />
                    <span>Destination</span>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-normal truncate max-w-full">
                    {destinations.find((d) => d.value === destination)?.label ||
                      "Where to?"}
                  </span>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  sideOffset={8}
                  className="w-[210px] p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl z-20 flex flex-col gap-0.5"
                >
                  {destinations.map((dest) => (
                    <button
                      key={dest.value}
                      type="button"
                      onClick={() => {
                        setDestination(dest.value);
                        setDestinationOpen(false);
                      }}
                      className={cn(
                        "w-full text-left text-sm py-2 px-3 rounded-xl transition-colors cursor-pointer flex items-center justify-between",
                        destination === dest.value
                          ? "bg-slate-100 dark:bg-slate-800 font-medium text-slate-900 dark:text-slate-100"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300",
                      )}
                    >
                      <span>{dest.label}</span>
                      {destination === dest.value && (
                        <Check className="w-4 h-4 text-primary shrink-0" />
                      )}
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700/80 shrink-0" />

            {/* Dates - shadcn Range Picker */}
            <div className="flex-1 min-w-0">
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger className="w-full flex flex-col items-start gap-0.5 px-4 py-2 rounded-2xl md:rounded-full hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors cursor-pointer text-left outline-none group border-0 bg-transparent">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Dates</span>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-normal truncate max-w-full">
                    {dateRange?.from
                      ? dateRange.to &&
                        dateRange.from.getTime() !== dateRange.to.getTime()
                        ? `${format(dateRange.from, "MMM d")} - ${format(
                            dateRange.to,
                            "MMM d",
                          )}`
                        : `${format(dateRange.from, "MMM d")} - Select return`
                      : "Add dates"}
                  </span>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl z-20"
                  align="center"
                  sideOffset={14}
                >
                  <Calendar
                    mode="range"
                    min={1}
                    defaultMonth={dateRange?.from || new Date()}
                    selected={dateRange}
                    onSelect={(range) => {
                      setDateRange(range);
                      // Only close when both start and return dates are selected and are not the same single date
                      if (
                        range?.from &&
                        range?.to &&
                        range.from.getTime() !== range.to.getTime()
                      ) {
                        setDatePickerOpen(false);
                      }
                    }}
                    numberOfMonths={2}
                    className="rounded-2xl"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700/80 shrink-0" />

            {/* Travelers */}
            <div className="flex-1 min-w-0">
              <Popover open={travelersOpen} onOpenChange={setTravelersOpen}>
                <PopoverTrigger className="w-full flex flex-col items-start gap-0.5 px-4 py-2 rounded-2xl md:rounded-full hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors cursor-pointer text-left outline-none group border-0 bg-transparent">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <Users className="w-4 h-4" />
                    <span>Travelers</span>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-normal truncate max-w-full">
                    {totalGuests > 0
                      ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                      : "Add guests"}
                  </span>
                </PopoverTrigger>
                <PopoverContent
                  className="w-72 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl z-20 flex flex-col gap-4"
                  align="center"
                  sideOffset={14}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Adults
                      </p>
                      <p className="text-xs text-slate-500">Ages 13 or above</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        disabled={adults <= 1}
                        className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center text-sm font-semibold">
                        {adults}
                      </span>
                      <button
                        type="button"
                        onClick={() => setAdults(Math.min(10, adults + 1))}
                        disabled={adults >= 10}
                        className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Children
                      </p>
                      <p className="text-xs text-slate-500">Ages 0 - 12</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        disabled={children <= 0}
                        className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center text-sm font-semibold">
                        {children}
                      </span>
                      <button
                        type="button"
                        onClick={() => setChildren(Math.min(10, children + 1))}
                        disabled={children >= 10}
                        className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700/80 shrink-0" />

            {/* Budget */}
            <div className="flex-1 min-w-0">
              <Popover open={budgetOpen} onOpenChange={setBudgetOpen}>
                <PopoverTrigger className="w-full flex flex-col items-start gap-0.5 px-4 py-2 rounded-2xl md:rounded-full hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors cursor-pointer text-left outline-none group border-0 bg-transparent">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <Banknote className="w-4 h-4" />
                    <span>Budget</span>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-normal truncate max-w-full">
                    {budget
                      ? budget === "economy"
                        ? "Economy (< $500)"
                        : budget === "moderate"
                          ? "Moderate ($500 - $1.5k)"
                          : budget === "premium"
                            ? "Comfort ($1.5k - $3k)"
                            : budget === "luxury"
                              ? "Luxury ($3k+)"
                              : budget
                      : "Per person"}
                  </span>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  sideOffset={8}
                  className="w-[230px] p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl z-20 flex flex-col gap-0.5"
                >
                  {[
                    { value: "economy", label: "Economy (< $500)" },
                    { value: "moderate", label: "Moderate ($500 - $1,500)" },
                    { value: "premium", label: "Comfort ($1,500 - $3,000)" },
                    { value: "luxury", label: "Luxury ($3,000+)" },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setBudget(item.value);
                        setBudgetOpen(false);
                      }}
                      className={cn(
                        "w-full text-left text-sm py-2 px-3 rounded-xl transition-colors cursor-pointer flex items-center justify-between",
                        budget === item.value
                          ? "bg-slate-100 dark:bg-slate-800 font-medium text-slate-900 dark:text-slate-100"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300",
                      )}
                    >
                      <span>{item.label}</span>
                      {budget === item.value && (
                        <Check className="w-4 h-4 text-primary shrink-0" />
                      )}
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
            </div>

            {/* Action Button */}
            <button
              type="button"
              className="w-full md:w-auto rounded-full bg-brand-accent text-white font-semibold text-sm md:text-base px-8 h-[52px] shadow-lg cursor-pointer shrink-0 transition-all hover:scale-105 active:scale-95 whitespace-nowrap flex items-center justify-center"
            >
              Plan my trip
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
