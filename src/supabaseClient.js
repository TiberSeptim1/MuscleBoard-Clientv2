import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cgqkjlatuwvduiaomebr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNncWtqbGF0dXd2ZHVpYW9tZWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MjQxMTcsImV4cCI6MjA2MzMwMDExN30.QaLIpCxLM7idv_rYhtxHXi-xvbAuGmn9vYJZ7CNm_So'
)

export default supabase
