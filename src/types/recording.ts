import { Tables, TablesInsert } from "./supabase";

export type RecordingType = Tables<'recordings'>

export type CreateRecordingType = TablesInsert<'recordings'>