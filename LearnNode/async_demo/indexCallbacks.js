console.log('Before');

getUser(1, (user) => {
    console.log('User', user);
    getRepositories(user.gitHubUsername, (repos) => {
        getCommits(repos[0], (commits) => {
            console.log('Commits', commits);
        });
    });
});


// to remove callback hell or nested functions
/*
getUser(1, getRepositories);

function getRepositories(user){
    console.log('User', user);
    getRepositories(user.gitHubUsername, getCommits);
}
function getCommits(repos){
    getCommits(repo, dispCommits);
}

function dispCommits(commits) {
    console.log(commits);
}
*/

console.log('After');

function getUser(id, callback){
    setTimeout(() => {
        console.log('Reading a user from database..');
        callback({id : id, gitHubUsername: 'Mukesh K'});
    }, 2000);   
}

function getRepositories(username, callback){
    setTimeout(() => {
        console.log('Reading a repositories from GitHub API...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000); 
}

function getCommits(repos, callback){
    setTimeout(() =>{
        console.log('Calling GitHub API...');
        callback(['commit']);
    }, 2000);
}