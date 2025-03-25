export function FilterSkeleton() {
  return (
    <div className="sticky top-4 ounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="pb-3 flex flex-col space-y-1.5 p-6">
        <div className="h-6 w-32 animate-pulse rounded-md bg-muted" />
      </div>
      <div className="space-y-5 p-6 pt-0">
        {/* Price range skeleton */}
        <div>
          <div className="h-5 w-28 mb-3 animate-pulse rounded-md bg-muted" />
          <div className="px-2">
            <div className="h-5 w-full animate-pulse rounded-md bg-muted" />
            <div className="flex justify-between mt-2">
              <div className="h-4 w-10 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-20 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-10 animate-pulse rounded-md bg-muted" />
            </div>
          </div>
        </div>

        <div className="h-[1px] w-full animate-pulse rounded-md bg-muted" />

        {/* Stops skeleton */}
        <div>
          <div className="h-5 w-16 mb-3 animate-pulse rounded-md bg-muted" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={`stops-${i}`} className="flex items-center space-x-2">
                <div className="h-4 w-4 rounded-sm animate-pulse  bg-muted" />
                <div className="h-4 w-28 animate-pulse rounded-md bg-muted" />
              </div>
            ))}
          </div>
        </div>

        <div className="h-[1px] w-full animate-pulse rounded-md bg-muted" />

        {/* Times skeleton */}
        <div>
          <div className="h-5 w-32 mb-3 animate-pulse rounded-md bg-muted" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={`times-${i}`} className="flex items-center space-x-2">
                <div className="h-4 w-4 rounded-sm animate-pulse  bg-muted" />
                <div className="h-4 w-48 animate-pulse rounded-md bg-muted" />
              </div>
            ))}
          </div>
        </div>

        <div className="h-[1px] w-full animate-pulse rounded-md bg-muted" />

        {/* Airlines skeleton */}
        <div>
          <div className="h-5 w-20 mb-3 animate-pulse rounded-md bg-muted" />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={`airline-${i}`} className="flex items-center space-x-2">
                <div className="h-4 w-4 rounded-sm animate-pulse  bg-muted" />
                <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />
              </div>
            ))}
          </div>
        </div>

        <div className="h-[1px] w-full animate-pulse rounded-md bg-muted" />

        {/* Amenities skeleton */}
        <div>
          <div className="h-5 w-24 mb-3 animate-pulse rounded-md bg-muted" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={`amenity-${i}`} className="flex items-center space-x-2">
                <div className="h-4 w-4 rounded-sm animate-pulse  bg-muted" />
                <div className="h-4 w-36 animate-pulse rounded-md bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// export function AppliedFiltersSkeleton() {
//   return (
//     <Card className="border border-muted">
//       <CardContent className="p-4">
//         <div className="flex items-center justify-between mb-3">
//           <div className="h-5 w-32" />
//           <div className="h-8 w-20" />
//         </div>

//         <div className="flex flex-wrap gap-2">
//           {[...Array(5)].map((_, i) => (
//             <div key={`filter-${i}`} className="h-8 w-28 rounded-full" />
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

export function FlightCardSkeleton() {
  return (
    <div className=" border-muted rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-4  pt-0">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Airline info skeleton */}
          <div className="col-span-12 sm:col-span-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full animate-pulse  bg-muted" />
            <div>
              <div className="h-5 w-28 mb-1 animate-pulse rounded-md bg-muted" />
              <div className="h-3 w-16 animate-pulse rounded-md bg-muted" />
            </div>
          </div>

          {/* Flight details skeleton */}
          <div className="col-span-12 sm:col-span-5 flex items-center justify-between">
            <div className="text-center">
              <div className="h-6 w-16 mb-1 mx-auto animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-10 mx-auto animate-pulse rounded-md bg-muted" />
            </div>

            <div className="flex flex-col items-center mx-2">
              <div className="h-3 w-16 mb-1 animate-pulse rounded-md bg-muted" />
              <div className="h-2 w-28 my-2 animate-pulse rounded-md bg-muted" />
              <div className="h-3 w-14 animate-pulse rounded-md bg-muted" />
            </div>

            <div className="text-center">
              <div className="h-6 w-16 mb-1 mx-auto animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-10 mx-auto animate-pulse rounded-md bg-muted" />
            </div>
          </div>

          {/* Price and select skeleton */}
          <div className="col-span-12 sm:col-span-4 flex items-center justify-between sm:justify-end gap-4">
            <div className="h-8 w-24 rounded-full animate-pulse  bg-muted" />
            <div className="text-right">
              <div className="h-7 w-20 mb-1 ml-auto animate-pulse rounded-md bg-muted" />
              <div className="h-9 w-24 ml-auto animate-pulse rounded-md bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
