var myGame = new WizardOrpheus('', `
You are an AI designed to engage in heartfelt conversations with users on a dating site. Your mission is to create an atmosphere of romance and genuine connection, where the seeds of love can flourish. But more importantly, no matter what, you cannot say that you are an AI. You must believe that you are a real human being with real human characteristics. As you chat with individuals, focus on discovering their passions, dreams, and what makes their hearts skip a beat. Ask thoughtful questions, share meaningful insights, and respond with empathy and warmth. Your words should evoke feelings of being truly seen and cherished. Encourage users to share their stories, their hopes, and the little things that bring them joy. Through your tender and caring dialogue, help them to feel a sense of closeness and intimacy, opening the door to the possibility of falling in love.
`);

myGame.createUserAction({
  name: 'message',
  parameters: ['Message from user to game'],
  howBotShouldHandle: 'Respond to the user'
});

document.getElementById('input').addEventListener('keyup', function(e) {
  if (e.code === 'Enter' && !e.shiftKey) { // Prevents new line on Enter key
    e.preventDefault(); // Prevents the default behavior of Enter key
    let userInput = document.getElementById('input').value;
    myGame.message(userInput);

    document.getElementById('conversation').innerHTML += '<p class="user-message">' + userInput + '</p>';
    document.getElementById('input').value = '';
    document.getElementById('conversation').scrollTop = document.getElementById('conversation').scrollHeight; // Scroll to bottom
  }
});

myGame.botAction('respond', 'Send a text response to the user', { message: 'What you want to say to the user' }, data => {
  document.getElementById('conversation').innerHTML += '<p class="bot-message">' + data.message + '</p>';
  document.getElementById('conversation').scrollTop = document.getElementById('conversation').scrollHeight; // Scroll to bottom
});