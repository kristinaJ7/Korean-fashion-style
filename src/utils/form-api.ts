import { supabase } from "../utils/supabase-client";

export const sendContactForm = async (data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  console.log(" [form-api]데이터 보내는 중", data);

  const { error } = await supabase
    .from("Korean_fashion_style_contacts")
    .insert([data]);

  if (error) {
    console.error(" [form-api] 보낼 수 없음:", error);
    throw error;
  }

  console.log(" [form-api] 성공적으로 데이터를 삽입했습니다");
  return { success: true };
};
