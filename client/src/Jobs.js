import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import Job from './Job';
import JobModal from './JobModal'
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
  })(Typography);

export default function Jobs({jobs}) {

    useEffect(() => {
        const welcomeItem= document.querySelectorAll('.welcome-item');
        let delay = 0;
        welcomeItem.forEach(item => {
            setTimeout(() => item.style.opacity = 1, delay);
            delay += 500;
        })
    }, []);

    // modal
    const [open, setOpen] = useState(false);
    const [selectedJob, selectJob] = useState({});
    function handleClickOpen() {
      setOpen(true);
    }  
    function handleClose() {
      setOpen(false);
    }
    // pagination
    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs / 50);
    const [activeStep, setActiveStep] = React.useState(0);
    const jobsOnPage = jobs.slice(activeStep * 50, (activeStep * 50) + 50);

    // step == 0, show 0-49
    // step == 1, show 50 - 99

    function scrollToTop () {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
          window.requestAnimationFrame(scrollToTop);
          window.scrollTo(0, c - c / 8);
        }
      }

    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        scrollToTop();
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        scrollToTop();
    }    

    return (
        <div className="jobs">
            <JobModal open={open} job={selectedJob} handleClose={handleClose} />
            <WhiteTextTypography variant="h2">
                Entry Level  Software Jobs
            </WhiteTextTypography>
            <WhiteTextTypography variant="h6" component="h2">
                Found {numJobs} Jobs
            </WhiteTextTypography>
            {
                jobsOnPage.map(
                    (job, i) => <Job key={i} job={job} onClick={() => {
                        console.log('clicked')
                        handleClickOpen();
                        selectJob(job)
                    }} />
                )
            }
            <WhiteTextTypography>
                Page {activeStep + 1} of {numPages}
            </WhiteTextTypography>
            <MobileStepper
                variant="progress"
                steps={numPages}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === numPages - 1}>
                    Next
                    <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    <KeyboardArrowLeft />
                    Back
                    </Button>
                }
            />

        </div>
    )
}