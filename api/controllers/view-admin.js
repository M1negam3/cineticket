module.exports = {


    friendlyName: 'View homepage or redirect',
  
  
    description: 'Display or redirect to the appropriate homepage, depending on login status.',
  
  
    exits: {
  
      success: {
        statusCode: 200,
        viewTemplatePath: 'pages/admin'
      },
  
    },
  
  
    fn: async function () {
  
    }
  
  
  };