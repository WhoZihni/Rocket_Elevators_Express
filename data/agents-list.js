const http = require('http');

function fetchAgents() {
  return new Promise((resolve, reject) => {
    const url = 'http://99.79.77.144:3000/api/agents';
    
    http.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const agents = JSON.parse(data);
          
          // Add id field and convert rating and fee to numbers
          const cleanedAgents = agents.map((agent, index) => {
            return {
              id: index + 1,
              first_name: agent.first_name,
              last_name: agent.last_name,
              email: agent.email,
              region: agent.region,
              rating: parseFloat(agent.rating),
              fee: parseFloat(agent.fee)
            };
          });
          
          console.log('Agents loaded successfully');
          resolve(cleanedAgents);
        } catch (error) {
          console.error('Failed to parse agents data:', error.message);
          reject(error);
        }
      });
    }).on('error', (error) => {
      console.error('Failed to fetch agents:', error.message);
      reject(error);
    });
  });
}

module.exports = fetchAgents;
