import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password, passwordConfirm }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  let { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, user } = await supabase.auth.getUser();

  if (data.error) throw new Error(data.error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password or email
  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Update user metadata
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        // https://dmfrkmtudnaftelkkyfj.supabase.co/storage/v1/object/public/avatars/khl20240111215825558.png
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updateError) throw new Error(updateError.message);
  return updatedUser;
}
