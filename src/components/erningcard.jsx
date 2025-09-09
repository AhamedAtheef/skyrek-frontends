import React from "react";
import { DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function EarningsCard() {
  const chartData = [40, 60, 35, 80, 45, 70, 55, 90, 65, 85, 75, 95];

  return (
    <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
      {/* Card Header */}
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          Total Revenue
        </CardTitle>
        <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-white" />
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent>
        <div className="space-y-3">
          <div className="text-2xl font-bold text-gray-800">$245,670</div>

          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12.5%
            </Badge>
            <span className="text-xs text-gray-400">from last month</span>
          </div>

          {/* Mini Bar Chart */}
          <div className="mt-4">
            <div className="flex items-end justify-between h-8 gap-1">
              {chartData.map((height, idx) => (
                <div
                  key={idx}
                  className="bg-pink-300 rounded-sm flex-1 transition-all duration-300 hover:bg-pink-400"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Jan</span>
              <span>Dec</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
