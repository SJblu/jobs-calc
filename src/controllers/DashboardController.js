const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    let jobsTotalHours = 0;
    
    const updatedJobs = jobs.map((job) => {
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";
      
      statusCount[status]++;

      if (status === "progress"){
        jobsTotalHours += Number(job["daily-hours"]);
      }
      
      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });
    
    let spareHours = profile["hours-per-day"] - jobsTotalHours;

    return res.render("index", {
      profile: profile,
      jobs: updatedJobs,
      statusCount: statusCount,
      spareHours: spareHours
    });
  },
};
