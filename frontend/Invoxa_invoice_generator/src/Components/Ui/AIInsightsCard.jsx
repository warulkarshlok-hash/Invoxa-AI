import { useState, useEffect } from "react";
import { Lightbulb } from "lucide-react";
import axiosInstance from "../../utils/AxiosInstance";
import { API_PATHS } from "../../utils/ApiPaths";

const AIInsightsCard = () => {
    const [insights, setInsights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AI.GET_DASHBOARD_SUMMARY);
                setInsights(response.data.insights || []);
            } catch (error) {
                console.error("Failed to fetch AI insights", error);
                setInsights([]); // Set empty array on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchInsights();
    }, []);

    return (
        <div className="bg-white border  border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 px-7 py-5">
                <Lightbulb className="w-7 h-7 text-yellow-500" />
                <h3 className="text-xl font-semibold text-gray-900">
                    AI Insights
                </h3>
            </div>

            {isLoading ? (
                <div className="px-7 pb-6 space-y-4">
                    <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                </div>
            ) : (
                <ul className="px-7 pb-6 space-y-4 list-disc list-inside">
                    {insights.map((insight, index) => (
                        <li
                            key={index}
                            className="text-base text-gray-700 leading-6 pl-1"
                        >
                            {insight}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AIInsightsCard;
