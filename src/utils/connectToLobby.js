import { supabase } from "./supabaseClient";

export function connectToExistingLobby(id) {}

localStorage.setItem("lastRoom", localStorage.getItem("room"));
localStorage.removeItem("room");
