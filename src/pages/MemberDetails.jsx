import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Trash2, Phone, Calendar, DollarSign, Clock, User, AlertTriangle } from "lucide-react"

// Skeletal Loader Component
const MemberDetailsSkeleton = () => {

    
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header Skeleton */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="flex items-center gap-4 px-6 py-4">
          <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
          <div>
            <div className="h-8 w-48 bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Member Details Skeleton */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="h-8 w-40 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-6 w-32 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-4">
                <div className="h-10 w-20 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-10 w-20 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </CardContent>
          </Card>

          {/* History Skeleton */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="h-6 w-40 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-8 w-32 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-4 bg-gray-800 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...Array(6)].map((_, j) => (
                        <div key={j} className="space-y-2">
                          <div className="h-3 w-16 bg-gray-700 rounded animate-pulse"></div>
                          <div className="h-5 w-24 bg-gray-700 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end mt-4">
                      <div className="h-8 w-16 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function MemberDetails({ destination }) {

    const navigate = useNavigate();

    const formatDate=(dateString)=>{
      const options = {day:'numeric', month:'short', year:'numeric'}
      return new Date(dateString).toLocaleDateString('en-US',options)
    };
    const [member, setMember] = useState({})
    const [loading, setLoading] = useState(false)
    const {id}= useParams();
  
    useEffect(()=>{
      setLoading(true);
      const fetchMembers = async () => {
        setLoading(true);
        
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData?.session?.access_token;
    
        if (!token) {
          console.error('No token found');
          setLoading(false);
          return;
        }
    
        try {
          const response = await axios.get(`${BASE_URL}/api/v1/subscriptions/history/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          setMember(response.data.data);
        } catch (error) {
          console.error('Error fetching member:', error.response?.data || error.message);
        } finally {
          setLoading(false);
        }
      };
    
      fetchMembers();
    },[id]);
  
    const handleDeleteSubscription = async () => {
      if (!window.confirm('Delete this subscription?')) return;
  
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      const userId = sessionData?.session?.user?.id;
  
      setLoading(true);
      axios
        .delete(`${BASE_URL}/api/v1/subscriptions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data:{
              "userId" :`${userId}`
          }
        })
        .then(() => {
          setLoading(false);
          navigate('/');
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    };
    
    const handleDeleteHistoryById = async (historyId) => {
      if (!window.confirm('Delete this history entry?')) return;
    
      setLoading(true);
    
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData?.session?.access_token;
    
        if (!token) {
          console.error('No token found');
          setLoading(false);
          return;
        }
    
        await axios.delete(`${BASE_URL}/api/v1/subscriptions/history/${historyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        setMember((prev) => ({
          ...prev,
          history: prev.history.filter((h) => h._id !== historyId),
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    const handleDeleteAllHistory = async () => {
      if (!window.confirm('Delete all history for this subscription?')) return;
    
      setLoading(true);
    
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData?.session?.access_token;
    
        if (!token) {
          console.error('No token found');
          setLoading(false);
          return;
        }
    
        await axios.delete(`${BASE_URL}/api/v1/subscriptions/history/subscription/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        setMember((prev) => ({
          ...prev,
          history: [],
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    


  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-600 hover:bg-green-700"
      case "expired":
        return "bg-red-600 hover:bg-red-700"
      case "pending":
        return "bg-yellow-600 hover:bg-yellow-700"
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  if (loading) {
    return <MemberDetailsSkeleton />
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Member Not Found</h1>
          <p className="text-gray-400">The requested member could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="flex items-center gap-4 px-6 py-4">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Member Details</h1>
            <p className="text-gray-400">View and manage member information</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Member Details Card */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <User className="h-6 w-6" />
                    {member.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">{member.phone}</span>
                  </div>
                </div>
                <Badge className={getStatusColor(member.status)}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">Start Date</span>
                  </div>
                  <p className="text-white font-semibold">{formatDate(member.startDate)}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">End Date</span>
                  </div>
                  <p className="text-white font-semibold">{formatDate(member.endDate)}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm font-medium">Price</span>
                  </div>
                  <p className="text-white font-semibold">{formatCurrency(member.price)}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm font-medium">Fees Paid</span>
                  </div>
                  <p className="text-white font-semibold">{formatCurrency(member.feesPaid)}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">Duration</span>
                  </div>
                  <p className="text-white font-semibold">{member.months} months</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Status</span>
                  </div>
                  <Badge className={getStatusColor(member.status)}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </Badge>
                </div>
              </div>

              <Separator className="my-6 bg-gray-700" />

              <div className="flex gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  <Link to={`/members/edit/${id}`}>
                  Edit Member
                  </Link>
                </Button>
                <Button onClick={handleDeleteSubscription} variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Member
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Membership History */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Membership History</CardTitle>
                {member.history.length > 0 && (
                  <Button onClick={handleDeleteAllHistory} variant="destructive" size="sm">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Delete All History
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {member.history && member.history.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No membership history found.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {member.history.map(({frequency, endDate, status, startDate, feesPaid, price, _id }, i) => (
                    <Card key={i} className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <span className="text-xs text-gray-400 font-medium">START DATE</span>
                            <p className="text-white text-sm">{formatDate(startDate)}</p>
                          </div>

                          <div className="space-y-1">
                            <span className="text-xs text-gray-400 font-medium">END DATE</span>
                            <p className="text-white text-sm">{formatDate(endDate)}</p>
                          </div>

                          <div className="space-y-1">
                            <span className="text-xs text-gray-400 font-medium">PRICE</span>
                            <p className="text-white text-sm font-semibold">{formatCurrency(price)}</p>
                          </div>

                          <div className="space-y-1">
                            <span className="text-xs text-gray-400 font-medium">FEES PAID</span>
                            <p className="text-white text-sm font-semibold">{formatCurrency(feesPaid)}</p>
                          </div>

                          <div className="space-y-1">
                            <span className="text-xs text-gray-400 font-medium">DURATION</span>
                            <p className="text-white text-sm">{months} months</p>
                          </div>

                          <div className="space-y-1">
                            <span className="text-xs text-gray-400 font-medium">STATUS</span>
                            <div>
                              <Badge className={`${getStatusColor(status)} text-xs`}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4">
                          <Button onClick={()=>handleDeleteHistoryById(_id)} variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
