# Per Scholas SBA 318 Express Server Application

I MADE MY VERY OWN FIRST API!!! 🎉🎉 I really enjoyed this assignment. 

For logins.js, it is supposed to be locked under an admin key but according to the rubric, this should be avoided for testing convenience.  

I made a middleware folder, and added a middleware that fetches a random salt, and uses that salt in my other middleware where i hash the password. Both these results are used in my POST request for users. 

For my tester, when using POST requests for <code>/users /logins /posts</code>, feel free to copy and paste these sample bodies for your convenience: 
<pre>{
  "name": {
    "first": "Tester",
    "last": "Learner",
    "display": "Per Scholas"
  },
  "email": "ps@example.com",
  "username": "perscholas123",
  "password": "12345"
}
</pre>
<pre>
{
    "id": 1,
    "userId": 3,
    "title": "What do you think about Root's UX? ",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sollicitudin eu libero vitae varius. Fusce ut orci vulputate, suscipit libero sed, porttitor lectus. Suspendisse sed sapien at lectus imperdiet porta sit amet eget ex. Sed semper, lectus eu vulputate euismod, sem nibh luctus nunc, ac lacinia tellus mi ultrices quam. Pellentesque fermentum tincidunt sem at malesuada. Ut turpis sapien, sollicitudin auctor hendrerit eu, posuere eu nulla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla aliquet massa vel ex fermentum iaculis. In aliquam nunc at consectetur ornare. Aliquam erat volutpat. Nullam facilisis in neque ut auctor. Suspendisse ac felis nisi. Duis tincidunt nibh non nunc aliquam finibus. In eleifend scelerisque neque non elementum. Nullam vel porttitor lorem, ac hendrerit lacus."
}
</pre>

## Requirements/Tracking

| Requirement | Weight | Finished |
| :-- | :--: | :--: |
| Create and use at least two pieces of custom middleware. | 5% |  |
| Create and use error-handling middleware | 5% |  |
| Use at least three different data categories (e.g., users, posts, or comments). | 5% |  |
| Utilize reasonable data structuring practices. | 5% |  |
| Create GET routes for all data that should be exposed to the client. | 5% |  |
| Create POST routes for data, as appropriate. At least one data category should allow for client creation via a POST request. | 5% |  |
| Create PATCH or PUT routes for data, as appropriate. At least one data category should allow for client manipulation via a PATCH or PUT request. | 5% |  |
| Create DELETE routes for data, as appropriate. At least one data category should allow for client deletion via a DELETE request. | 5% |  |
| Include query parameters for data filtering, where appropriate. At least one data category should allow for additional filtering through the use of query parameters. <br><br> Note: DO NOT use API keys; this makes it more difficult for instructors to grade finished projects efficiently. | 5% |  |
| Utilize route parameters, where appropriate. | 5% |  |
| Adhere to the guiding principles of REST. | 10% |  |
| Create and render at least one view using a view template and template engine. This can be a custom template engine or a third-party engine. <br><br> If you are stuck on how to approach this, think about ways you could render the current state of your API's data for easy viewing. | 8% |  |
| Use simple CSS to style the rendered views. <br><br> Note: This is not a test of design; it is a test of serving static files using Express. The CSS can be very simple. | 2% |  |
| Include a form within a rendered view that allows for interaction with your RESTful API. | 3% |  |
| Utilize reasonable code organization practices. | 5% |  |
| Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit). | 10% |  |
| Commit frequently to the git repository. | 5% | ✅ |
| Include a README file that contains a description of your application. | 2% | ✅ |
| Level of effort displayed in creativity, presentation, and user experience. | 5% | ✅ |