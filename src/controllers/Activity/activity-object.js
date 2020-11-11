export function activityValueObject({
  _id,
  id_owner_user,
  name,
  date_start,
  date_end,
  execution_time,
  days_week,
  pillar,
  xp,
  mastery_points,
  status,
}) {
  return {
    _id,
    id_owner_user,
    name,
    date_start,
    date_end,
    execution_time,
    days_week,
    pillar,
    xp,
    mastery_points,
    status,
  };
}

export function activityUpdateObject({
  _id,
  id_owner_user,
  name,
  date_start,
  date_end,
  execution_time,
  days_week,
  pillar,
  status,
}) {
  return {
    _id,
    id_owner_user,
    name,
    date_start,
    date_end,
    execution_time,
    days_week,
    pillar,
    status,
  };
}
