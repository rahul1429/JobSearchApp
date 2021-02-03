import React from 'react';
import './App.css';
import Particles from 'react-particles-js';

import Jobs from './Jobs';

const JOB_API_URL = 'http://localhost:3001/jobs';

async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API_URL);
  let json = await res.json();

  updateCb(json);
}

function App() {

  const [jobList, updateJobs] = React.useState([]);

  React.useEffect(() => {
    fetchJobs(updateJobs);
  }, [])

  return (
    <div className="App">
    <Particles className='particles'
              params={{
                  particles: {
                    number: {
                      value:100,
                      density: {
                        enable: true,
                        value_area: 900,
                      }
                    },
                    "color": {
                      "value": "#0000ff"
                    },
                  }
            		}
            	}
              
      />
      <Jobs jobs={jobList} />
    </div>
  );
}

export default App;