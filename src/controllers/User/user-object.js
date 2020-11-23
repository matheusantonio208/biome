export function updateUserObject({
  first_name,
  last_name,
  email,
  password_hash,
  photo_profile,
  date_birth,
  phone_number,
  country,
  state,
}) {
  return {
    first_name,
    last_name,
    email,
    password_hash,
    photo_profile,
    date_birth,
    phone_number,
    country,
    state,
  };
}

export function newUserObject({
  first_name,
  last_name,
  email,
  password_hash,
  date_birth,
  phone_number,
  country,
  state,
}) {
  return {
    first_name,
    last_name,
    email,
    password_hash,
    date_birth,
    phone_number,
    country,
    state,
  };
}

export function loginUserObject({ email, password_hash }) {
  return { email, password_hash };
}
