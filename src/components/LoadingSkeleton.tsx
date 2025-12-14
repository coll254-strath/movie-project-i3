import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, index) => (
        <Card key={index} className="overflow-hidden bg-card border-border">
          <Skeleton className="aspect-[2/3] w-full" />
          <CardContent className="p-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
