// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { 
//   Users, 
//   Heart, 
//   DollarSign, 
//   UserCheck, 
//   Mail, 
//   Settings, 
//   LogOut, 
//   Download, 
//   Eye, 
//   Edit, 
//   Search,
//   Filter,
//   MoreVertical,
//   CheckCircle,
//   XCircle,
//   Clock,
//   MessageSquare,
//   RefreshCw,
//   Calendar,
//   Phone,
//   MapPin
// } from "lucide-react"

// // API Functions
// const fetchDonations = async () => {
//   try {
//     const response = await fetch('/api/donations')
//     if (!response.ok) throw new Error('Failed to fetch donations')
//     return await response.json()
//   } catch (error) {
//     console.error('Error fetching donations:', error)
//     // Fallback mock data
//     return [
//       { id: "DON001", donor: "Rajesh Kumar", amount: 5000, purpose: "Education", date: "2024-01-15", status: "Completed" },
//       { id: "DON002", donor: "Priya Sharma", amount: 2500, purpose: "Healthcare", date: "2024-01-14", status: "Completed" },
//       { id: "DON003", donor: "Amit Patel", amount: 10000, purpose: "General Fund", date: "2024-01-13", status: "Completed" },
//       { id: "DON004", donor: "Sunita Gupta", amount: 1000, purpose: "Community Development", date: "2024-01-12", status: "Pending" },
//       { id: "DON005", donor: "Vikram Singh", amount: 7500, purpose: "Education", date: "2024-01-11", status: "Completed" },
//     ]
//   }
// }

// const fetchVolunteers = async () => {
//   try {
//     const response = await fetch('/api/volunteers')
//     if (!response.ok) throw new Error('Failed to fetch volunteers')
//     return await response.json()
//   } catch (error) {
//     console.error('Error fetching volunteers:', error)
//     // Fallback mock data
//     return [
//       { id: "VOL001", name: "Anita Desai", email: "anita@email.com", phone: "+91 98765 43210", area: "Education", status: "Active", joinDate: "2024-01-10" },
//       { id: "VOL002", name: "Rohit Mehta", email: "rohit@email.com", phone: "+91 98765 43211", area: "Healthcare", status: "Active", joinDate: "2024-01-08" },
//       { id: "VOL003", name: "Kavya Nair", email: "kavya@email.com", phone: "+91 98765 43212", area: "Community Development", status: "Pending", joinDate: "2024-01-07" },
//       { id: "VOL004", name: "Arjun Reddy", email: "arjun@email.com", phone: "+91 98765 43213", area: "Event Organization", status: "Active", joinDate: "2024-01-05" },
//     ]
//   }
// }

// const fetchMessages = async () => {
//   try {
//     const response = await fetch('/api/contact/submission')
//     if (!response.ok) throw new Error('Failed to fetch messages')
//     return await response.json()
//   } catch (error) {
//     console.error('Error fetching messages:', error)
//     // Fallback mock data
//     return [
//       { 
//         id: "MSG001", 
//         name: "Sarah Johnson", 
//         email: "sarah@email.com", 
//         phone: "+91 98765 55555", 
//         subject: "Volunteer Opportunity", 
//         message: "I would like to volunteer for your education programs. Please let me know how I can help.", 
//         createdAt: "2024-01-16T10:30:00Z", 
//         status: "unread" 
//       },
//       { 
//         id: "MSG002", 
//         name: "David Kumar", 
//         email: "david@email.com", 
//         phone: "+91 98765 44444", 
//         subject: "Donation Query", 
//         message: "I want to make a donation for healthcare initiatives. What are the tax benefits?", 
//         createdAt: "2024-01-15T14:20:00Z", 
//         status: "read" 
//       },
//       { 
//         id: "MSG003", 
//         name: "Maya Patel", 
//         email: "maya@email.com", 
//         phone: "+91 98765 33333", 
//         subject: "Partnership Proposal", 
//         message: "Our company would like to partner with your foundation for CSR activities. Let's discuss.", 
//         createdAt: "2024-01-14T09:15:00Z", 
//         status: "replied" 
//       },
//       { 
//         id: "MSG004", 
//         name: "Ravi Singh", 
//         email: "ravi@email.com", 
//         phone: "+91 98765 22222", 
//         subject: "Event Inquiry", 
//         message: "When is your next community event? I would like to attend and contribute.", 
//         createdAt: "2024-01-13T16:45:00Z", 
//         status: "unread" 
//       },
//     ]
//   }
// }

// export default function AdminDashboard() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [donations, setDonations] = useState([])
//   const [volunteers, setVolunteers] = useState([])
//   const [messages, setMessages] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [activeTab, setActiveTab] = useState("donations")

//   useEffect(() => {
//     // Check authentication
//     const authStatus = localStorage.getItem("vanya_admin_auth")
//     if (authStatus === "true") {
//       setIsAuthenticated(true)
//       loadData()
//     } else {
//       window.location.href = "/admin"
//     }
//   }, [])

//   const loadData = async () => {
//     setLoading(true)
//     try {
//       const [donationsData, volunteersData, messagesData] = await Promise.all([
//         fetchDonations(),
//         fetchVolunteers(),
//         fetchMessages()
//       ])
//       setDonations(donationsData)
//       setVolunteers(volunteersData)
//       setMessages(messagesData)
//     } catch (error) {
//       console.error('Error loading data:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("vanya_admin_auth")
//     window.location.href = "/admin"
//   }

//   const handleRefresh = () => {
//     loadData()
//   }

//   const markMessageAsRead = async (messageId) => {
//     try {
//       const response = await fetch(`/api/contact/submission/${messageId}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: 'read' })
//       })
//       if (response.ok) {
//         setMessages(prev => prev.map(msg => 
//           msg.id === messageId ? { ...msg, status: 'read' } : msg
//         ))
//       }
//     } catch (error) {
//       console.error('Error marking message as read:', error)
//     }
//   }

//   const approveVolunteer = async (volunteerId) => {
//     try {
//       const response = await fetch(`/api/volunteers/${volunteerId}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: 'Active' })
//       })
//       if (response.ok) {
//         setVolunteers(prev => prev.map(vol => 
//           vol.id === volunteerId ? { ...vol, status: 'Active' } : vol
//         ))
//       }
//     } catch (error) {
//       console.error('Error approving volunteer:', error)
//     }
//   }

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     })
//   }

//   const formatDateTime = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     })
//   }

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
//         <div className="animate-pulse flex items-center space-x-2">
//           <RefreshCw className="w-6 h-6 animate-spin text-primary" />
//           <span className="text-lg font-medium">Loading...</span>
//         </div>
//       </div>
//     )
//   }

//   const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0)
//   const completedDonations = donations.filter((d) => d.status === "Completed").length
//   const activeVolunteers = volunteers.filter((v) => v.status === "Active").length
//   const pendingVolunteers = volunteers.filter((v) => v.status === "Pending").length
//   const unreadMessages = messages.filter((m) => m.status === "unread").length

//   const filteredDonations = donations.filter(donation =>
//     donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     donation.purpose.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   const filteredVolunteers = volunteers.filter(volunteer =>
//     volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     volunteer.area.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   const filteredMessages = messages.filter(message =>
//     message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     message.subject.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   const getStatusBadge = (status, type = 'default') => {
//     const statusConfig = {
//       Completed: { variant: 'default', className: 'bg-green-100 text-green-800 hover:bg-green-200' },
//       Pending: { variant: 'secondary', className: 'bg-orange-100 text-orange-800 hover:bg-orange-200' },
//       Active: { variant: 'default', className: 'bg-blue-100 text-blue-800 hover:bg-blue-200' },
//       unread: { variant: 'secondary', className: 'bg-red-100 text-red-800 hover:bg-red-200' },
//       read: { variant: 'outline', className: 'bg-gray-100 text-gray-800 hover:bg-gray-200' },
//       replied: { variant: 'default', className: 'bg-green-100 text-green-800 hover:bg-green-200' }
//     }

//     const config = statusConfig[status] || { variant: 'outline', className: '' }
//     return (
//       <Badge variant={config.variant} className={`transition-colors ${config.className}`}>
//         {status === 'unread' ? 'New' : status}
//       </Badge>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//       {/* Enhanced Header */}
//       <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-4">
//               <div>
//                 <h1 className="text-xl font-bold text-primary">Vanya Foundation</h1>
//                 <p className="text-sm text-muted-foreground">Admin Dashboard</p>
//               </div>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={handleRefresh}
//                 disabled={loading}
//                 className="hover:bg-slate-100"
//               >
//                 <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//               </Button>
//             </div>
//             <div className="flex items-center space-x-3">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 w-64 shadow-inner"
//                 />
//               </div>
//               <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-shadow">
//                 <Settings className="w-4 h-4 mr-2" />
//                 Settings
//               </Button>
//               <Button 
//                 variant="outline" 
//                 size="sm" 
//                 onClick={handleLogout}
//                 className="shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Logout
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Enhanced Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
//           <Card className="shadow-inner hover:shadow-lg transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Total Donations</p>
//                   <p className="text-2xl font-bold text-primary">₹{totalDonations.toLocaleString()}</p>
//                 </div>
//                 <div className="p-3 bg-primary/10 rounded-full">
//                   <DollarSign className="w-6 h-6 text-primary" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="shadow-inner hover:shadow-lg transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Completed</p>
//                   <p className="text-2xl font-bold text-green-600">{completedDonations}</p>
//                 </div>
//                 <div className="p-3 bg-green-100 rounded-full">
//                   <CheckCircle className="w-6 h-6 text-green-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="shadow-inner hover:shadow-lg transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Active Volunteers</p>
//                   <p className="text-2xl font-bold text-blue-600">{activeVolunteers}</p>
//                 </div>
//                 <div className="p-3 bg-blue-100 rounded-full">
//                   <UserCheck className="w-6 h-6 text-blue-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="shadow-inner hover:shadow-lg transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Pending Applications</p>
//                   <p className="text-2xl font-bold text-orange-600">{pendingVolunteers}</p>
//                 </div>
//                 <div className="p-3 bg-orange-100 rounded-full">
//                   <Clock className="w-6 h-6 text-orange-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="shadow-inner hover:shadow-lg transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">New Messages</p>
//                   <p className="text-2xl font-bold text-purple-600">{unreadMessages}</p>
//                 </div>
//                 <div className="p-3 bg-purple-100 rounded-full">
//                   <MessageSquare className="w-6 h-6 text-purple-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Enhanced Main Content */}
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//           <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm shadow-inner">
//             <TabsTrigger value="donations" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
//               Donations
//             </TabsTrigger>
//             <TabsTrigger value="volunteers" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
//               Volunteers
//             </TabsTrigger>
//             <TabsTrigger value="messages" className="relative data-[state=active]:bg-white data-[state=active]:shadow-sm">
//               Messages
//               {unreadMessages > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {unreadMessages}
//                 </span>
//               )}
//             </TabsTrigger>
//             <TabsTrigger value="content" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
//               Content
//             </TabsTrigger>
//           </TabsList>

//           {/* Enhanced Donations Tab */}
//           <TabsContent value="donations">
//             <Card className="shadow-inner border-0 bg-white/60 backdrop-blur-sm">
//               <CardHeader className="border-b bg-white/40">
//                 <div className="flex justify-between items-center">
//                   <CardTitle className="flex items-center space-x-2">
//                     <DollarSign className="w-5 h-5" />
//                     <span>Recent Donations</span>
//                   </CardTitle>
//                   <div className="flex space-x-2">
//                     <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-shadow">
//                       <Filter className="w-4 h-4 mr-2" />
//                       Filter
//                     </Button>
//                     <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-shadow">
//                       <Download className="w-4 h-4 mr-2" />
//                       Export
//                     </Button>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent className="p-0">
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-slate-50/50">
//                       <tr className="border-b">
//                         <th className="text-left p-4 font-medium text-sm text-gray-600">ID</th>
//                         <th className="text-left p-4 font-medium text-sm text-gray-600">Donor</th>
//                         <th className="text-left p-4 font-medium text-sm text-gray-600">Amount</th>
//                         <th className="text-left p-4 font-medium text-sm text-gray-600">Purpose</th>
//                         <th className="text-left p-4 font-medium text-sm text-gray-600">Date</th>
//                         <th className="text-left p-4 font-medium text-sm text-gray-600">Status</th>
//                         <th className="text-left p-4 font-medium text-sm text-gray-600">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredDonations.map((donation, index) => (
//                         <tr 
//                           key={donation.id} 
//                           className={`border-b hover:bg-slate-50/50 transition-colors ${index % 2 === 0 ? 'bg-white/20' : 'bg-white/10'}`}
//                         >
//                           <td className="p-4 font-mono text-sm text-gray-600">{donation.id}</td>
//                           <td className="p-4 font-medium">{donation.donor}</td>
//                           <td className="p-4 text-gray-600">{donation.amount}</td>
//                           <td className="p-4 text-gray-600 flex items-center">
//                             <Phone className="w-4 h-4 mr-1 text-gray-400" />
//                             {donation.phone}
//                           </td>
//                           <td className="p-4 font-medium max-w-xs truncate">{donation.subject}</td>
//                           <td className="p-4 text-gray-600 max-w-md">
//                             <div className="truncate">{donation.message}</div>
//                           </td>
//                           <td className="p-4 text-gray-600 flex items-center">
//                             <Calendar className="w-4 h-4 mr-1 text-gray-400" />
//                             {formatDateTime(donation.createdAt)}
//                           </td>
//                           <td className="p-4">{getStatusBadge(donation.status)}</td>
//                           <td className="p-4">
//                             <div className="flex space-x-1">
//                               <Button 
//                                 variant="ghost" 
//                                 size="sm" 
//                                 className="hover:bg-blue-50"
//                                 onClick={() => markMessageAsRead(donation.id)}
//                               >
//                                 <Eye className="w-4 h-4 text-blue-600" />
//                               </Button>
//                               <Button variant="ghost" size="sm" className="hover:bg-green-50">
//                                 <Mail className="w-4 h-4 text-green-600" />
//                               </Button>
//                               <Button variant="ghost" size="sm" className="hover:bg-gray-50">
//                                 <MoreVertical className="w-4 h-4 text-gray-600" />
//                               </Button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Enhanced Content Management Tab */}
//           <TabsContent value="content">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card className="shadow-inner border-0 bg-white/60 backdrop-blur-sm">
//                 <CardHeader className="border-b bg-white/40">
//                   <CardTitle className="flex items-center space-x-2">
//                     <Edit className="w-5 h-5" />
//                     <span>Website Pages</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-6 space-y-4">
//                   <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50/50 transition-all duration-200 shadow-inner bg-white/40">
//                     <div className="flex items-center space-x-3">
//                       <div className="p-2 bg-blue-100 rounded-full">
//                         <Eye className="w-4 h-4 text-blue-600" />
//                       </div>
//                       <span className="font-medium">Homepage</span>
//                     </div>
//                     <Button 
//                       variant="ghost" 
//                       size="sm" 
//                       onClick={() => window.open("/?admin=VANYA_ADMIN_2024", "_blank")}
//                       className="hover:bg-blue-50 shadow-sm"
//                     >
//                       <Edit className="w-4 h-4 mr-2" />
//                       Edit
//                     </Button>
//                   </div>
//                   <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50/50 transition-all duration-200 shadow-inner bg-white/40">
//                     <div className="flex items-center space-x-3">
//                       <div className="p-2 bg-green-100 rounded-full">
//                         <Users className="w-4 h-4 text-green-600" />
//                       </div>
//                       <span className="font-medium">About Us</span>
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => window.open("/about?admin=VANYA_ADMIN_2024", "_blank")}
//                       className="hover:bg-green-50 shadow-sm"
//                     >
//                       <Edit className="w-4 h-4 mr-2" />
//                       Edit
//                     </Button>
//                   </div>
//                   <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50/50 transition-all duration-200 shadow-inner bg-white/40">
//                     <div className="flex items-center space-x-3">
//                       <div className="p-2 bg-purple-100 rounded-full">
//                         <Heart className="w-4 h-4 text-purple-600" />
//                       </div>
//                       <span className="font-medium">Our Work</span>
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => window.open("/our-work?admin=VANYA_ADMIN_2024", "_blank")}
//                       className="hover:bg-purple-50 shadow-sm"
//                     >
//                       <Edit className="w-4 h-4 mr-2" />
//                       Edit
//                     </Button>
//                   </div>
//                   <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50/50 transition-all duration-200 shadow-inner bg-white/40">
//                     <div className="flex items-center space-x-3">
//                       <div className="p-2 bg-orange-100 rounded-full">
//                         <MapPin className="w-4 h-4 text-orange-600" />
//                       </div>
//                       <span className="font-medium">Contact</span>
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => window.open("/contact?admin=VANYA_ADMIN_2024", "_blank")}
//                       className="hover:bg-orange-50 shadow-sm"
//                     >
//                       <Edit className="w-4 h-4 mr-2" />
//                       Edit
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="shadow-inner border-0 bg-white/60 backdrop-blur-sm">
//                 <CardHeader className="border-b bg-white/40">
//                   <CardTitle className="flex items-center space-x-2">
//                     <Settings className="w-5 h-5" />
//                     <span>Media & Content</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-6 space-y-4">
//                   <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50/50 transition-all duration-200 shadow-inner bg-white/40">
//                     <div className="flex items-center space-x-3">
//                       <div className="p-2 bg-pink-100 rounded-full">
//                         <Eye className="w-4 h-4 text-pink-600" />
//                       </div>
//                       <span className="font-medium">Gallery</span>
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => window.open("/gallery?admin=VANYA_ADMIN_2024", "_blank")}
//                       className="hover:bg-pink-50 shadow-sm"
//                     >
//                       <Edit className="w-4 h-4 mr-2" />
//                       Edit
//                     </Button>
//                   </div>
//                   <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50/50 transition-all duration-200 shadow-inner bg-white/40">
//                     <div className="flex items-center space-x-3">
//                       <div className="p-2 bg-indigo-100 rounded-full">
//                         <MessageSquare className="w-4 h-4 text-indigo-600" />
//                       </div>
//                       <span className="font-medium">Blog & News</span>
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => window.open("/blog?admin=VANYA_ADMIN_2024", "_blank")}
//                       className="hover:bg-indigo-50 shadow-sm"
//                     >
//                       <Edit className="w-4 h-4 mr-2" />
//                       Edit
//                     </Button>
//                   </div>
                  
//                   {/* Additional Content Management Options */}
//                   <div className="mt-6 pt-6 border-t">
//                     <h4 className="font-semibold mb-4 text-gray-700">Quick Actions</h4>
//                     <div className="grid grid-cols-2 gap-3">
//                       <Button variant="outline" size="sm" className="justify-start shadow-sm hover:shadow-md transition-shadow">
//                         <Download className="w-4 h-4 mr-2" />
//                         Backup Data
//                       </Button>
//                       <Button variant="outline" size="sm" className="justify-start shadow-sm hover:shadow-md transition-shadow">
//                         <Settings className="w-4 h-4 mr-2" />
//                         Site Settings
//                       </Button>
//                       <Button variant="outline" size="sm" className="justify-start shadow-sm hover:shadow-md transition-shadow">
//                         <Users className="w-4 h-4 mr-2" />
//                         User Management
//                       </Button>
//                       <Button variant="outline" size="sm" className="justify-start shadow-sm hover:shadow-md transition-shadow">
//                         <Eye className="w-4 h-4 mr-2" />
//                         Analytics
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// // }
// //                           <td className="p-4 font-semibold text-green-600">₹{donation.amount.toLocaleString()}</td>
// //                           <td className="p-4">{donation.purpose}</td>
// //                           <td className="p-4 text-gray-600">{formatDate(donation.date)}</td>
// //                           <td className="p-4">{getStatusBadge(donation.status)}</td>
// //                           <td className="p-4">
// //                             <div className="flex space-x-1">
// //                               <Button variant="ghost" size="sm" className="hover:bg-blue-50">
// //                                 <Eye className="w-4 h-4 text-blue-600" />
// //                               </Button>
// //                               <Button variant="ghost" size="sm" className="hover:bg-green-50">
// //                                 <Mail className="w-4 h-4 text-green-600" />
// //                               </Button>
// //                               <Button variant="ghost" size="sm" className="hover:bg-gray-50">
// //                                 <MoreVertical className="w-4 h-4 text-gray-600" />
// //                               </Button>
// //                             </div>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </TabsContent>

// //           {/* Enhanced Volunteers Tab */}
// //           <TabsContent value="volunteers">
// //             <Card className="shadow-inner border-0 bg-white/60 backdrop-blur-sm">
// //               <CardHeader className="border-b bg-white/40">
// //                 <div className="flex justify-between items-center">
// //                   <CardTitle className="flex items-center space-x-2">
// //                     <Users className="w-5 h-5" />
// //                     <span>Volunteer Applications</span>
// //                   </CardTitle>
// //                   <div className="flex space-x-2">
// //                     <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-shadow">
// //                       <Filter className="w-4 h-4 mr-2" />
// //                       Filter
// //                     </Button>
// //                     <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-shadow">
// //                       <Download className="w-4 h-4 mr-2" />
// //                       Export
// //                     </Button>
// //                   </div>
// //                 </div>
// //               </CardHeader>
// //               <CardContent className="p-0">
// //                 <div className="overflow-x-auto">
// //                   <table className="w-full">
// //                     <thead className="bg-slate-50/50">
// //                       <tr className="border-b">
// //                         <th className="text-left p-4 font-medium text-sm text-gray-600">ID</th>
// //                         <th className="text-left p-4 font-medium text-sm text-gray-600">Name</th>
// //                         <th className="text-left p-4 font-medium text-sm text-gray-600">Email</th>
// //                         <th className="text-left p-4 font-medium text-sm text-gray-600">Phone</th>
// //                         <th className="text-left p-4 font-medium text-sm text-gray-600">Area</th>
// //                         <th className="text-left p-4 font-medium text-sm text-gray-600">Status</th>
// //                         <th className="text-left p-4 font-medium text-sm text-gray-600">Join Date</th>
// //                         <th className="text-left p-4 font-medium text-sm text-gray-600">Actions</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {filteredVolunteers.map((volunteer, index) => (
// //                         <tr 
// //                           key={volunteer.id} 
// //                           className={`border-b hover:bg-slate-50/50 transition-colors ${index % 2 === 0 ? 'bg-white/20' : 'bg-white/10'}`}
// //                         >
// //                           <td className="p-4 font-mono text-sm text-gray-600">{volunteer.id}</td>
// //                           <td className="p-4 font-medium">{volunteer.name}</td>
// //                           <td className="p-4 text-gray-600">{volunteer.email}</td>
// //                           <td className="p-4 text-gray-600">{volunteer.phone}</td>
// //                           <td className="p-4">{volunteer.area}</td>
// //                           <td className="p-4">{getStatusBadge(volunteer.status)}</td>
// //                           <td className="p-4 text-gray-600">{formatDate(volunteer.joinDate)}</td>
// //                           <td className="p-4">
// //                             <div className="flex space-x-1">
// //                               <Button variant="ghost" size="sm" className="hover:bg-blue-50">
// //                                 <Eye className="w-4 h-4 text-blue-600" />
// //                               </Button>
// //                               <Button variant="ghost" size="sm" className="hover:bg-green-50">
// //                                 <Mail className="w-4 h-4 text-green-600" />
// //                               </Button>
// //                               {volunteer.status === "Pending" && (
// //                                 <Button 
// //                                   variant="ghost" 
// //                                   size="sm" 
// //                                   className="hover:bg-green-50"
// //                                   onClick={() => approveVolunteer(volunteer.id)}
// //                                 >
// //                                   <UserCheck className="w-4 h-4 text-green-600" />
// //                                 </Button>
// //                               )}
// //                             </div>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </TabsContent>

// //           {/* New Messages Tab */}
// //           <TabsContent value="messages">
// //             <Card className="shadow-inner border-0 bg-white/60 backdrop-blur-sm">
// //               <CardHeader className="border-b bg-white/40">
// //                 <div className="flex justify-between items-center">
// //                   <CardTitle className="flex items-center space-x-2">
// //                     <MessageSquare className="w-5 h-5" />
// //                     <span>Contact Messages</span>
// //                     {unreadMessages > 0 && (
// //                       <Badge variant="destructive" className="ml-2">
// //                         {unreadMessages} new
// //                       </Badge>
// //                     )}
// //                   </CardTitle>
// //                   <div className="flex space-x-2">
// //                     <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-shadow">
// //                       <Filter className="w-4 h-4 mr-2" />
// //                       Filter
// //                     </Button>
// //                     <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-shadow">
// //                       <Download className="w-4 h-4 mr-2" />
// //                       Export
// //                     </Button>
// //                   </div>
// //                 </div>
// //               </CardHeader>
// //               {/* <CardContent className="p-0">
// //                 <div className="overflow-x-auto">
// //                   <table className="w-full">
// //                     <thead className="bg-slate-50/50">
// //                       <tr className="border-b">
// //                         <th className="text-left p-4 font-medium text-sm text-gray-600">ID</th>
// //                         <th className="text-left p-4 font-medium text-sm text-gray-600">Name</th>
// //                         <th className="text-left p-4 font-medium text-sm text-gray-600">Email</th>
// //                         <th className="text-left p-4 font-medium text-sm text-gray-600">Phone</th>
// //                         <th className="text-left p-4 font-medium text-sm text-gray-600">Subject</th>
// //                         <th className="text-left p-4 font-medium text-sm text-gray-600">Message</th>
// //                         <th className="text-left p-4 font-medium text-sm text-gray-600">Date</th>
// //                         <th className="text-left p-4 font-medium text-sm text-gray-600">Status</th>
// //                         <th className="text-left p-4 font-medium text-sm text-gray-600">Actions</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {filteredMessages.map((message, index) => (
// //                         <tr 
// //                           key={message.id} 
// //                           className={`border-b hover:bg-slate-50/50 transition-colors ${message.status === 'unread' ? 'bg-blue-50/30' : index % 2 === 0 ? 'bg-white/20' : 'bg-white/10'}`}
// //                         >
// //                           <td className="p-4 font-mono text-sm text-gray-600">{message.id}</td>
// //                           <td className="p-4 font-medium */}
// //                           </Card>
// //                           </