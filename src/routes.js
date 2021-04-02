const express = require("express");
const router = express.Router();

const Profile = {
  data: { 
    name: "Silvio Souza",
    avatar: "https://github.com/SJblu.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
  },

  controller: {
    index(req, res) {
      res.render("profile", { profile: Profile.data })
    },

    update(req, res) {
      const data = req.body;

      const weeksPerYear = 52;
      const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
      const monthlyTotalHours = weekTotalHours * weeksPerMonth;
      const valueHour = data["monthly-budget"] / monthlyTotalHours

      Profile.data = {
        ...Profile.data,
        ...req.body,
        "value-hour": valueHour
      }

      return res.redirect("/profile");

    }
  }
};



const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 10,
      created_at: Date.now(),
    },
    {
      id: 2,
      name: "OneTwo Project",
      "daily-hours": 3,
      "total-hours": 47,
      created_at: Date.now(),
    },
  ],

  controller: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job);
        const status = remaining <= 0 ? "done" : "progress";

        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data["value-hour"]),
        };
      });

      return res.render("index", { profile: Profile.data, jobs: updatedJobs });
    },

    save(req, res) {
      const lastId = Job.data[Job.data.length - 1].id || 0;

      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now(),
      });

      return res.redirect("/");
    },

    create(req, res) {
      res.render("job")
    },

    show(req, res) {
      const jobId = req.params.id;

      const job = Job.data.find(job => Number(job.id) === Number(jobId));

      if(!job){
        return res.send("Job not found");
      }

      job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"]),
      
      res.render("job-edit", { job }) 
    },

    update(req, res) {
      const jobId = req.params.id;

      const job = Job.data.find(job => Number(job.id) === Number(jobId));

      if(!job){
        return res.send("Job not found");
      }

      const updatedJob = {
        ...job,
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"],
      }

      Job.data = Job.data.map(job => {
        if(Number(job.id) === Number(jobId)) {
          job = updatedJob
        }
        return job;
      })

      res.redirect('/job/'+jobId);

      
    },

    delete(req, res) {
      const jobId = req.params.id;

      Job.data = Job.data.filter(job => Number(jobId) !== Number(job.id))

      return res.redirect('/')
    }
  },

  services: {
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
};



// rota index
router.get("/", Job.controller.index);


router.get("/job", Job.controller.create);
router.post("/job", Job.controller.save);   

router.get("/job/:id", Job.controller.show);
router.post("/job/:id", Job.controller.update);
router.post("/job/delete/:id", Job.controller.delete);

router.get("/profile", Profile.controller.index);
router.post("/profile", Profile.controller.update);


module.exports = router;
