"use client";
import React from "react";
import { useEffect, useState } from "react";
import {
  Users,
  Heart,
  DollarSign,
  UserCheck,
  Mail,
  Settings,
  LogOut,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import { useSession } from "@/components/context/SessionContext";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, logout, loading } = useSession();
  const router = useRouter();
  const [donations, setDonations] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState("donations");
  useEffect(() => {
    if (!loading) {
      if (user?.id) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        setIsAuthenticated(false);
        router.push("/admin");
      }
    }
  }, [user, loading]);

  const fetchData = async () => {
    try {
      const [donRes, volRes, msgRes] = await Promise.all([
        fetch("/api/donations"),
        fetch("/api/volunteer"),
        fetch("/api/contact/submission"),
      ]);
      const donationsData = await donRes.json();
      const volunteersData = await volRes.json();
      const messagesData = await msgRes.json();

      setDonations(donationsData || []);
      setVolunteers(volunteersData.volunteers || []);
      setMessages(messagesData.submissions || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const completedDonations = donations.filter(
    (d) => d.status === "Completed"
  ).length;
  const activeVolunteers = volunteers.filter(
    (v) => v.status === "Active"
  ).length;
  const pendingVolunteers = volunteers.filter(
    (v) => v.status === "Pending"
  ).length;

  const Badge = ({ children, variant = "default", className = "" }) => (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        variant === "default"
          ? "bg-slate-100 text-slate-700"
          : "bg-slate-50 text-slate-600"
      } ${className}`}
    >
      {children}
    </span>
  );

  const Button = ({
    children,
    onClick = () => {},
    variant = "default",
    size = "default",
    className = "",
  }) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2";
    const variantClasses = {
      default: "bg-slate-900 text-white hover:bg-slate-800",
      outline:
        "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
      ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
    };
    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      default: "h-10 px-4",
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      >
        {children}
      </button>
    );
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Vanya Foundation
              </h1>
              <p className="text-sm text-slate-500">Admin Dashboard</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-slate-200 shadow-inner rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">
                    Total Donations
                  </p>
                  <p className="text-2xl font-semibold text-slate-900">
                    ₹{totalDonations.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-slate-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 shadow-inner rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">
                    Completed Donations
                  </p>
                  <p className="text-2xl font-semibold text-slate-900">
                    {completedDonations}
                  </p>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-slate-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 shadow-inner rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">
                    Active Volunteers
                  </p>
                  <p className="text-2xl font-semibold text-slate-900">
                    {activeVolunteers}
                  </p>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-slate-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 shadow-inner rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">
                    Pending Applications
                  </p>
                  <p className="text-2xl font-semibold text-slate-900">
                    {pendingVolunteers}
                  </p>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-slate-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 shadow-inner rounded-lg p-1">
            <div className="flex space-x-1">
              {[
                { id: "donations", label: "Donations" },
                { id: "volunteers", label: "Volunteers" },
                { id: "messages", label: "Messages" },
                { id: "content", label: "Content" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Donations Tab */}
          {activeTab === "donations" && (
            <div className="bg-white border border-slate-200 shadow-inner rounded-lg">
              <div className="border-b border-slate-100 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Recent Donations
                  </h3>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Donor
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Purpose
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {donations.map((donation) => (
                      <tr
                        key={donation.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="p-4 font-mono text-sm text-slate-600">
                          {donation.id}
                        </td>
                        <td className="p-4 text-sm text-slate-900">
                          {donation.donor}
                        </td>
                        <td className="p-4 text-sm font-medium text-slate-900">
                          ₹{donation.amount.toLocaleString()}
                        </td>
                        <td className="p-4 text-sm text-slate-600">
                          {donation.purpose}
                        </td>
                        <td className="p-4 text-sm text-slate-600">
                          {donation.date}
                        </td>
                        <td className="p-4">
                          <Badge
                            variant={
                              donation.status === "Completed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {donation.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Mail className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {donations.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="p-8 text-center text-slate-500"
                        >
                          No donations found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Volunteers Tab */}
          {activeTab === "volunteers" && (
            <div className="bg-white border border-slate-200 shadow-inner rounded-lg">
              <div className="border-b border-slate-100 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Volunteer Applications
                  </h3>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Area
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Join Date
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {volunteers.map((v) => (
                      <tr
                        key={v.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="p-4 font-mono text-sm text-slate-600">
                          {v.id}
                        </td>
                        <td className="p-4 text-sm text-slate-900">
                          {v.firstName} {v.lastName}
                        </td>
                        <td className="p-4 text-sm text-slate-600">
                          {v.email}
                        </td>
                        <td className="p-4 text-sm text-slate-600">
                          {v.phone}
                        </td>
                        <td className="p-4 text-sm text-slate-600">
                          {v.areasOfInterest?.join(", ")}
                        </td>
                        <td className="p-4">
                          <Badge
                            variant={
                              v.status === "Active" ? "default" : "secondary"
                            }
                          >
                            {v.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-slate-600">
                          {new Date(v.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {volunteers.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className="p-8 text-center text-slate-500"
                        >
                          No volunteer applications found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="bg-white border border-slate-200 shadow-inner rounded-lg">
              <div className="border-b border-slate-100 px-6 py-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  Contact Messages
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {messages.map((msg) => (
                      <tr
                        key={msg._id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="p-4 text-sm text-slate-900">
                          {msg.firstName} {msg.lastName}
                        </td>
                        <td className="p-4 text-sm text-slate-600">
                          {msg.email}
                        </td>
                        <td className="p-4 text-sm text-slate-600">
                          {msg.phone}
                        </td>
                        <td className="p-4 text-sm text-slate-900">
                          {msg.subject}
                        </td>
                        <td className="p-4 text-sm text-slate-600 max-w-xs truncate">
                          {msg.message}
                        </td>
                        <td className="p-4 text-sm text-slate-600">
                          {new Date(msg.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {messages.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="p-8 text-center text-slate-500"
                        >
                          No messages found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Content Management Tab */}
          {activeTab === "content" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 shadow-inner rounded-lg">
                <div className="border-b border-slate-100 px-6 py-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Website Pages
                  </h3>
                </div>
                <div className="p-6 space-y-3">
                  {[
                    { name: "Homepage", url: "/?admin=VANYA_ADMIN_2024" },
                    { name: "About Us", url: "/about?admin=VANYA_ADMIN_2024" },
                    {
                      name: "Our Work",
                      url: "/our-work?admin=VANYA_ADMIN_2024",
                    },
                    { name: "Contact", url: "/contact?admin=VANYA_ADMIN_2024" },
                  ].map((page) => (
                    <div
                      key={page.name}
                      className="flex justify-between items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-slate-900 font-medium">
                        {page.name}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(page.url, "_blank")}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 shadow-inner rounded-lg">
                <div className="border-b border-slate-100 px-6 py-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Media & Content
                  </h3>
                </div>
                <div className="p-6 space-y-3">
                  {[
                    { name: "Gallery", url: "/gallery?admin=VANYA_ADMIN_2024" },
                    {
                      name: "Blog & News",
                      url: "/blog?admin=VANYA_ADMIN_2024",
                    },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex justify-between items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-slate-900 font-medium">
                        {item.name}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(item.url, "_blank")}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
