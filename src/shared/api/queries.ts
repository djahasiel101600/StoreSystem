// import supabase from "./client";

// export async function getAll<T>(table: string): Promise<T[]> {
//     const { data, error } = await supabase.from<T>(table).select('*');
//     if (error) throw error;
//     return data as T[];
// }

// export async function getById<T>(table: string, id: number | string): Promise<T | null> {
//     const { data, error } = await supabase.from<T>(table).select('*').eq('id', id).single();
//     if (error) throw error;
//     return data as T | null;
// }

// export async function create<T>(table: string, payload: Partial<T>): Promise<T> {
//     const { data, error } = await supabase.from<T>(table).insert([payload]).single();
//     if (error) throw error;
//     return data as T;
// }

// export async function update<T>(table: string, id: number | string, payload: Partial<T>): Promise<T> {
//     const { data, error } = await supabase.from<T>(table).update(payload).eq('id', id).single();
//     if (error) throw error;
//     return data as T;
// }

// export async function remove(table: string, id: number | string): Promise<void> {
//     const { error } = await supabase.from(table).delete().eq('id', id);
//     if (error) throw error;
// }