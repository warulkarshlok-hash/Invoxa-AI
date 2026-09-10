import { useEffect, useState } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import { API_PATHS } from "../../utils/ApiPaths";
import { Loader2, FileText, DollarSign, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Button from "../../components/ui/Button";
import AIInsightsCard from "../../Components/Ui/AIInsightsCard";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalInvoices: 0,
    totalPaid: 0,
    totalUnpaid: 0,
  });

  const [recentInvoices, setRecentInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.INVOICE.GET_ALL_INVOICES
        );

        const invoices = response.data;

        const totalInvoices = invoices.length;

        const totalPaid = invoices
          .filter((inv) => inv.status === "Paid")
          .reduce((acc, inv) => acc + inv.total, 0);

        const totalUnpaid = invoices
          .filter((inv) => inv.status !== "Paid")
          .reduce((acc, inv) => acc + inv.total, 0);

        setStats({ totalInvoices, totalPaid, totalUnpaid });

        setRecentInvoices(
          invoices
            .sort(
              (a, b) =>
                new Date(b.invoiceDate) - new Date(a.invoiceDate)
            )
            .slice(0, 5)
        );
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsData = [
    {
      icon: FileText,
      label: "Total Invoices",
      value: stats.totalInvoices,
      color: "blue",
    },
    {
      icon: DollarSign,
      label: "Total Paid",
      value: `$${stats.totalPaid.toFixed(2)}`,
      color: "emerald",
    },
    {
      icon: DollarSign,
      label: "Total Unpaid",
      value: `$${stats.totalUnpaid.toFixed(2)}`,
      color: "red",
    },
  ];

  const colorClasses = {
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
    emerald: { bg: "bg-emerald-100", text: "text-emerald-600" },
    red: { bg: "bg-red-100", text: "text-red-600" },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 px-7 py-8">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900">
          Dashboard
        </h2>

        <p className="text-base text-gray-600 mt-2">
          A quick overview of your business finances.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-5">
              <div
                className={`flex-shrink-0 w-16 h-16 ${colorClasses[stat.color].bg
                  } rounded-xl flex items-center justify-center`}
              >
                <stat.icon
                  className={`w-8 h-8 ${colorClasses[stat.color].text
                    }`}
                />
              </div>

              <div>
                <div className="text-base font-medium text-gray-500 mb-1">
                  {stat.label}
                </div>

                <div className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights Card */}
       <AIInsightsCard/> 

      {/* Recent Invoices */}
      <div className="mt-10 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-7 py-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            Recent Invoices
          </h3>
          <Button
            variant="ghost"
            onClick={() => navigate("/invoices")}
            className="text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors duration-200"
          >
            View All
          </Button>
        </div>

        {recentInvoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-7 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Client
                  </th>
                  <th className="px-7 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Amount
                  </th>
                  <th className="px-7 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-7 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Due Date
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {recentInvoices.map((invoice) => (
                  <tr
                    key={invoice._id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/invoices/${invoice._id}`)}
                  >
                    <td className="px-7 py-5">
                      <div className="text-sm font-medium text-gray-900">
                        {invoice.billTo.clientName}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        #{invoice.invoiceNumber}
                      </div>
                    </td>

                    <td className="px-7 py-5 text-sm font-medium text-gray-900">
                      ${invoice.total.toFixed(2)}
                    </td>

                    <td className="px-7 py-5">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${invoice.status === "Paid"
                          ? "bg-emerald-100 text-emerald-800"
                          : invoice.status === "Pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                          }`}
                      >
                        {invoice.status}
                      </span>
                    </td>

                    <td className="px-7 py-5 text-sm text-gray-500">
                      {moment(invoice.dueDate).format("MMM D, YYYY")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-7 h-7 text-gray-400" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No invoices yet
            </h3>

            <p className="text-sm text-gray-500 max-w-md mb-5">
              You haven't created any invoices yet. Get started by creating your
              first one.
            </p>

            <Button
              onClick={() => navigate("/invoices/new")}
              icon={Plus}
            >
              Create Invoice
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;