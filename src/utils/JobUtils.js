module.exports = {
  remainingDays(job) {
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
  
    const createdDate = new Date(job.created_at);
    const dueDay = createdDate.getDate() + Number(remainingDays);
    const dueDateinMs = createdDate.setDate(dueDay);
  
    const timeDiffInMs = dueDateinMs - Date.now();
  
    const dayInMs = 1000 * 60 * 60 * 24;
    const dayDiff = Math.floor(timeDiffInMs / dayInMs);
  
    return dayDiff;
  },

  calculateBudget(job, valueHour) {
    return valueHour * job["total-hours"]
  }
}