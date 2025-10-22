import { supabase } from './supabase'

export type Todo = {
  id: number
  title: string
  completed?: boolean
}

/**
 * Fetch all todos from Supabase
 */
export async function getTodos(): Promise<Todo[]> {
  const { data, error } = await supabase.from('todos').select('*')
  if (error) throw error
  return (data as Todo[]) ?? []
}

/**
 */
export async function createTodo(payload: Omit<Todo, 'id'>): Promise<Todo | null> {
  const { data, error } = await supabase.from('todos').insert(payload).select().single()
  if (error) throw error
  return (data as Todo) ?? null
}

/**
 * Update an existing todo by id
 */
export async function updateTodo(id: number, changes: Partial<Todo>): Promise<Todo | null> {
  const { data, error } = await supabase.from('todos').update(changes).eq('id', id).select().single()
  if (error) throw error
  return (data as Todo) ?? null
}

/**
 * Delete a todo by id
 */
export async function deleteTodo(id: number): Promise<void> {
  const { error } = await supabase.from('todos').delete().eq('id', id)
  if (error) throw error
}

export type NewUserPayload = {
  login: string
  senha: string
}

/**
 * Register a new user in the `usuario` table.
 * Note: this function currently stores the password as provided by the caller.
 * For production, hash the password before inserting or use Supabase Auth.
 */
export async function registerUser(payload: NewUserPayload) {
  const { login, senha } = payload

  const { data, error } = await supabase
    .from('usuario')
    .insert({ login, senha })
    .select()
    .single()

  if (error) throw error
  return data ?? null
}

export type User = {
  id: string
  login: string
  senha?: string
  data_criacao?: string
}

/**
 * Authenticate a user against the `usuario` table.
 * NOTE: This checks the plaintext password because `usuario.senha` currently stores plain text.
 * For production, migrate to Supabase Auth or hash passwords server-side.
 */
export async function loginUser(login: string, senha: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('usuario')
    .select('*')
    .eq('login', login)
    .eq('senha', senha)
    .single()

  if (error) {
    // If not found Supabase returns an error with code 406? We'll normalize to a friendly error
    throw error
  }

  return (data as User) ?? null
}
