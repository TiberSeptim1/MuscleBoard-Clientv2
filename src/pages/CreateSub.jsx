
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, UserPlus, ArrowLeft } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import supabase from '../SupabaseClient.js';
import { BASE_URL } from '../components/Appurl.js';

export default function CreateSub(destination='/') {
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
  
      const data = {...formData,
        "userId":userId,
      }
  
      if(!token){
        console.error("no token")
        setLoading(false);
        return;
      }
      axios
      .post(`${BASE_URL}/api/v1/subscriptions/`, data,{
        headers:{
          Authorization: `Bearer ${token}`,
          'Content-Type':'application/json',
        }
      })
      .then (()=>{
        setLoading(false);
        navigate('/')
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
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <Link to={destination}>
            Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Create New Member</h1>
            <p className="text-gray-400">Add a new member to your gym</p>
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
                    type="text"
                    placeholder="Enter member's full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
                  />
                  {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                </div>

                {/* Price and Fees Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-white">
                      Membership Price (₹) 
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
                    />
                    {errors.price && <p className="text-red-400 text-sm">{errors.price}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fees" className="text-white">
                      Fees Paid(₹) *
                    </Label>
                    <Input
                      id="fees"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.feesPaid}
                      onChange={handleChange}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
                    />
                    {errors.fees && <p className="text-red-400 text-sm">{errors.fees}</p>}
                  </div>
                </div>

                {/* Payment Frequency */}
                <div className="space-y-2">
                  <Label htmlFor="frequency" className="text-white">
                    Payment Frequency 
                  </Label>
                  <input
                    type="number"
                    id="frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    min="0"
                    step="1"
                    required
                    placeholder="Months"/>
                    
                </div>

                {/* Start Date */}
                <div className="space-y-2">
                  <Label className="text-white">Membership Start Date </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
                          !formData.startDate && "text-gray-400",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={handleChange}
                        initialFocus
                        className="bg-gray-800 text-white"
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.startDate && <p className="text-red-400 text-sm">{errors.startDate}</p>}
                </div>

                {/* Contact Information */}
                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-white">
                    Contact Information 
                  </Label>
                  <Textarea
                    id="contact"
                    placeholder="Enter phone number, email, or other contact details"
                    value={formData.contact}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 min-h-[100px]"
                  />
                  {errors.contact && <p className="text-red-400 text-sm">{errors.contact}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Member...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Create Member
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
