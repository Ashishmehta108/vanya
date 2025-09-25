"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Heart, DollarSign, UserCheck, Mail, Settings, LogOut, Download, Eye, Edit } from "lucide-react"

// Mock data - in real app, this would come from your database
const mockDonations = [
  { id: "DON001", donor: "Rajesh Kumar", amount: 5000, purpose: "Education", date: "2024-01-15", status: "Completed" },
  { id: "DON002", donor: "Priya Sharma", amount: 2500, purpose: "Healthcare", date: "2024-01-14", status: "Completed" },
  {
    id: "DON003",
    donor: "Amit Patel",
    amount: 10000,
    purpose: "General Fund",
    date: "2024-01-13",
    status: "Completed",
  },
  {
    id: "DON004",
    donor: "Sunita Gupta",
    amount: 1000,
    purpose: "Community Development",
    date: "2024-01-12",
    status: "Pending",
  },
  { id: "DON005", donor: "Vikram Singh", amount: 7500, purpose: "Education", date: "2024-01-11", status: "Completed" },
]

const mockVolunteers = [
  {
    id: "VOL001",
    name: "Anita Desai",
    email: "anita@email.com",
    phone: "+91 98765 43210",
    area: "Education",
    status: "Active",
    joinDate: "2024-01-10",
  },
  {
    id: "VOL002",
    name: "Rohit Mehta",
    email: "rohit@email.com",
    phone: "+91 98765 43211",
    area: "Healthcare",
    status: "Active",
    joinDate: "2024-01-08",
  },
  {
    id: "VOL003",
    name: "Kavya Nair",
    email: "kavya@email.com",
    phone: "+91 98765 43212",
    area: "Community Development",
    status: "Pending",
    joinDate: "2024-01-07",
  },
  {
    id: "VOL004",
    name: "Arjun Reddy",
    email: "arjun@email.com",
    phone: "+91 98765 43213",
    area: "Event Organization",
    status: "Active",
    joinDate: "2024-01-05",
  },
]

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check authentication
    const authStatus = localStorage.getItem("vanya_admin_auth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    } else {
      window.location.href = "/admin"
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("vanya_admin_auth")
    window.location.href = "/admin"
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const totalDonations = mockDonations.reduce((sum, donation) => sum + donation.amount, 0)
  const completedDonations = mockDonations.filter((d) => d.status === "Completed").length
  const activeVolunteers = mockVolunteers.filter((v) => v.status === "Active").length
  const pendingVolunteers = mockVolunteers.filter((v) => v.status === "Pending").length

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-primary">Vanya Foundation</h1>
              <p className="text-sm text-muted-foreground">Admin Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Donations</p>
                  <p className="text-2xl font-bold text-primary">₹{totalDonations.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed Donations</p>
                  <p className="text-2xl font-bold text-green-600">{completedDonations}</p>
                </div>
                <Heart className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Volunteers</p>
                  <p className="text-2xl font-bold text-blue-600">{activeVolunteers}</p>
                </div>
                <UserCheck className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Applications</p>
                  <p className="text-2xl font-bold text-orange-600">{pendingVolunteers}</p>
                </div>
                <Users className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="donations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          {/* Donations Tab */}
          <TabsContent value="donations">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Donations</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">ID</th>
                        <th className="text-left p-2">Donor</th>
                        <th className="text-left p-2">Amount</th>
                        <th className="text-left p-2">Purpose</th>
                        <th className="text-left p-2">Date</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDonations.map((donation) => (
                        <tr key={donation.id} className="border-b">
                          <td className="p-2 font-mono text-sm">{donation.id}</td>
                          <td className="p-2">{donation.donor}</td>
                          <td className="p-2 font-semibold">₹{donation.amount.toLocaleString()}</td>
                          <td className="p-2">{donation.purpose}</td>
                          <td className="p-2">{donation.date}</td>
                          <td className="p-2">
                            <Badge variant={donation.status === "Completed" ? "default" : "secondary"}>
                              {donation.status}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Mail className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Volunteers Tab */}
          <TabsContent value="volunteers">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Volunteer Applications</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">ID</th>
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Phone</th>
                        <th className="text-left p-2">Area</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Join Date</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockVolunteers.map((volunteer) => (
                        <tr key={volunteer.id} className="border-b">
                          <td className="p-2 font-mono text-sm">{volunteer.id}</td>
                          <td className="p-2">{volunteer.name}</td>
                          <td className="p-2">{volunteer.email}</td>
                          <td className="p-2">{volunteer.phone}</td>
                          <td className="p-2">{volunteer.area}</td>
                          <td className="p-2">
                            <Badge variant={volunteer.status === "Active" ? "default" : "secondary"}>
                              {volunteer.status}
                            </Badge>
                          </td>
                          <td className="p-2">{volunteer.joinDate}</td>
                          <td className="p-2">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Mail className="w-4 h-4" />
                              </Button>
                              {volunteer.status === "Pending" && (
                                <Button variant="ghost" size="sm" className="text-green-600">
                                  <UserCheck className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Website Pages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded hover:bg-muted/50 transition-colors">
                    <span>Homepage</span>
                    <Button variant="ghost" size="sm" onClick={() => window.open("/?admin=VANYA_ADMIN_2024", "_blank")}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Homepage
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded hover:bg-muted/50 transition-colors">
                    <span>About Us</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open("/about?admin=VANYA_ADMIN_2024", "_blank")}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit About
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded hover:bg-muted/50 transition-colors">
                    <span>Our Work</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open("/our-work?admin=VANYA_ADMIN_2024", "_blank")}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Our Work
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded hover:bg-muted/50 transition-colors">
                    <span>Contact</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open("/contact?admin=VANYA_ADMIN_2024", "_blank")}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Media & Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded hover:bg-muted/50 transition-colors">
                    <span>Gallery</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open("/gallery?admin=VANYA_ADMIN_2024", "_blank")}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Gallery
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded hover:bg-muted/50 transition-colors">
                    <span>Blog & News</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open("/blog?admin=VANYA_ADMIN_2024", "_blank")}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Blog
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
