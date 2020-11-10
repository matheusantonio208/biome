export function updatedUserObject(
  {
    first_name,
    last_name,
    email,
    password_hash,
    photo_profile,
    date_birth,
    phone_number,
    country,
    state,
  } = data) {
  return (
    {
      first_name,
      last_name,
      email,
      password_hash,
      photo_profile,
      date_birth,
      phone_number,
      country,
      state,
    });
}

export function newUserObject(
  {
    first_name,
    last_name,
    email,
    password_hash,
    photo_profile,
    date_birth,
    phone_number,
    country,
    state,
    group,
    date_last_login,
    locale_last_login,
    account_status,
  } = data) {
    return ({first_name,
      last_name,
      email,
      password_hash,
      photo_profile,
      date_birth,
      phone_number,
      country,
      state,
      group,
      date_last_login,
      locale_last_login,
      account_status});
  }

export function loggedUserObject({
  email,
  password_hash,
} = data) {
  return ({
    email,
    password_hash,
  });
}
