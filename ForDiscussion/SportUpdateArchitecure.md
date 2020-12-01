Design / Mock up an architecture to handle sport updates from a 3rd party provider(ideally using cloud technologies).
a.HTTP is the transport method used by the third party to send message to us.
b.The messages need to be entered into a database in order to query them for client use.

    Example feed messages:
    - Event updates
        - including changes of score / betting enabled or disabled
    - Odds updates
        - updates for the odds available for the event

Use a scheduled lambda serverless function to poll the third party service with requests to the third party service.
Lambda makes sense since we only need a small, narrow piece of logic to make requests and process the response.
In the same lambda function store the messages in a database for clients to read and if needed make requests/trigger
lambda functions for services that need to be aware of changes expressed in the polled third party service
