const express = require('express');
const router = express.Router();
const { handlePunchIn, handlePunchOut } = require('../services/timeService');

router.post('/webhook', async (req, res) => {
  const { message, userId } = req.body;
  
  let response;
  
  if (message.toLowerCase().includes('punch in')) {
    response = await handlePunchIn(userId);
  } 
  else if (message.toLowerCase().includes('punch out')) {
    response = await handlePunchOut(userId);
  }
  else {
    response = "I can help you with: \n- Punch In\n- Punch Out\n\nWhat would you like to do?";
  }
  
  res.json({ response });
});

module.exports = router;