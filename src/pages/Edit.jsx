import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, UserPlus, ArrowLeft } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../SupabaseClient.js';
import { BASE_URL } from '../components/Appurl.js';

export default function Edit({destination='/'}) {

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

    const {id}=useParams();
    const [member, setMember] = useState({})
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

      console.log(member.name)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  
  const [formData, setFormData]=useState({
          name:'',
          price:'',
          frequency:'',
          startDate:'',
          feesPaid:'',
          contact:'',
  })

  useEffect(()=>{
    setFormData({
        name:member.name||'',
        price:member.price||'',
        frequency:member.frequency||'',
        startDate:formatDate(member.startDate)||'',
        feesPaid:member.feesPaid||'',
        contact:member.contact||'',
        
    }
    )
  },[member]);
  const handleChange = (e)=>{
    const {name , value} = e.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }));
  };

  const handleSubmit = async (e)=>{
    e.preventDefault()
    
    setLoading(true);
    const {data:sessionData} = await supabase.auth.getSession();
    const token = sessionData?.session?.access_token;
    const userId = sessionData?.session?.user?.id;
    console.log(userId)

    const data = {...formData,
      "userId":userId,
    }

    if(!token){
      console.error("no token")
      setLoading(false);
      return;
    }
    axios
    .put(`${BASE_URL}/api/v1/subscriptions/${id}`, data,{
      headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type':'application/json',
      }
    })
    .then (()=>{
      setLoading(false);
      navigate(`/members/details/${member._id}`)
    })
    .catch((error)=>{
      setLoading(false);
      console.log(error); 
    })
  }
  
    
 return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="flex items-center gap-4 px-6 py-4">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700" onClick={() => navigate(destination)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold " >Edit or Renew Member</h1>
            
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <UserPlus className="h-5 w-5" />
                Member Information
              </CardTitle>
              <CardDescription className="text-gray-400">
                Fill in the details below to create a new member account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name 
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter member's full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
                  />
    
                </div>

                {/* Price and Fees Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-white">
                      Membership Price (₹) 
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="100"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fees" className="text-white">
                      Fees Paid (₹) 
                    </Label>
                    <Input
                      id="fees"
                      name="feesPaid"
                      type="number"
                      step="100"
                      placeholder="0.00"
                      value={formData.feesPaid}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
                    />
  
                  </div>
                </div>

                {/* Payment Frequency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="frequency" className="text-white">
                      Frequency
                    </Label>
                    <Input
                      id="frequency"
                      name="frequency"
                      type="number"
                      step="1"
                      placeholder="0.00"
                      value={formData.frequency}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
                    />
                  </div>
                    
                </div>

                {/* Start Date */}
                <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-white">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md  bg-gray-800 text-white px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>


                {/* Contact Information */}
                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-white">
                    Contact Information 
                  </Label>
                  <Textarea
                    id="contact"
                    name="contact"
                    placeholder="Enter phone number, email, or other contact details"
                    value={formData.contact}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 min-h-[100px]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving Member...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}