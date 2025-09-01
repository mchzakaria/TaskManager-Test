export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
}

export interface Task {
  id: number
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  due_date?: string
  status: 'pending' | 'completed'
  created_at: string
  updated_at: string
  user_id: number
}