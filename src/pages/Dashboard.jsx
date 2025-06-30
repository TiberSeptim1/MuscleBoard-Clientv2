
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { StatsCards } from "@/components/stats-cards"
import { IncomeCharts } from "@/components/income-charts"
import { MemberTable } from "@/components/member-table"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import supabase from '../SupabaseClient.js';
import { BASE_URL } from '../components/Appurl.js';


export default function Dashboard() {
  const [statsLoading, setStatsLoading] = useState(true);
  const [membersLoading, setMembersLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [members, setMembers] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      setMembersLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      const userMetaData = sessionData?.session?.user?.user_metadata;

      setMetaData(userMetaData);

      if (!token) {
        console.error('No token found');
        setMembersLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/v1/subscriptions/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMembers(response.data.data);
      } catch (error) {
        console.error('Error fetching members:', error.response?.data || error.message);
      } finally {
        setMembersLoading(false);
      }
    };

    const fetchStats = async () => {
      setStatsLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      if (!token) {
        console.error('No token found');
        setStatsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/v1/subscriptions/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(response.data);
      } catch (error) {
        console.error('Error fetching:', error.response?.data || error.message);
      } finally {
        setStatsLoading(false);
      }
    };
    const fetchAll = async()=>{
      await Promise.all([fetchMembers(), fetchStats()]);
    };
    fetchAll();
  }, []);




  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar metaData={metaData}/>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-8 space-y-8">
            <StatsCards members={members} loading={membersLoading} stats={stats} />
            <IncomeCharts
              monthlyData={stats.monthlyData}
              yearlyIncome={stats.yearlyIncome}
              totalIncome={stats.overallIncome}
              loading={statsLoading}
            />
            <MemberTable
              members={members}
              loading={membersLoading}
              searchTerm={searchTerm} setSearchTerm={setSearchTerm}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
