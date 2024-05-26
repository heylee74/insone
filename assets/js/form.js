const SUPABASE_URL = 'https://eskxxiikabcakgxdpfbx.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVza3h4aWlrYWJjYWtneGRwZmJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY3MjYxMzksImV4cCI6MjAzMjMwMjEzOX0.5mJqhK7ZXl7XZz-Ug5mtNTyI2sXcttoiZc18ETEBIBc';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let isSubmitting = false;

document.querySelector('.form').addEventListener('submit', async function (e) {
  e.preventDefault();

  if (isSubmitting) {
    alert('신청중입니다. 잠시만 기다려 주세요');
    return;
  }

  isSubmitting = true;

  const name = document.querySelector('.input-name').value;
  const phone = document.querySelector('.input-phone').value;
  const company = document.querySelector('.input-company').value;
  const festival = document.querySelector('.input-festival').value;
  const inquiry = document.querySelector('.input-inquiry').value;

  if (!name) {
    alert('이름을 입력해주세요.');
    document.querySelector('.input-name').focus();
    isSubmitting = false;
    return;
  }

  if (!phone) {
    alert('핸드폰 번호를 입력해주세요.');
    document.querySelector('.input-phone').focus();
    isSubmitting = false;
    return;
  }

  const phonePattern = /^010 - \d{4} - \d{4}$/;
  if (phone.length !== 17 || !phonePattern.test(phone)) {
    alert('연락처 형식이 잘못되었습니다. (예: 010 - 1234 - 5678)');
    document.getElementById('contactNumber').focus();
    isSubmitting = false;
    return;
  }

  if (!company) {
    alert('회사 혹은 단체명을 입력해주세요.');
    document.querySelector('.input-company').focus();
    isSubmitting = false;
    return;
  }

  if (!festival) {
    alert('행사명을 입력해주세요');
    document.querySelector('.input-festival').focus();
    isSubmitting = false;
    return;
  }

  if (!inquiry) {
    alert('문의 사항을 입력해주세요.');
    document.querySelector('.input-inquiry').focus();
    isSubmitting = false;
    return;
  }

  const { data, error } = await sb
    .from('festival')
    .insert([{ name, phone, company, festival, inquiry }])
    .select();

  if (error) {
    alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
  } else {
    alert('상담 신청이 완료되었습니다.');
    document.querySelector('.form').reset();
  }

  isSubmitting = false;
});
