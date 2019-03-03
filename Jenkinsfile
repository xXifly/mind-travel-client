pipeline {
    agent {
        docker {
            image 'node:alpine' 
            args '-p 5000:5000 -v mind-travel-client-prod-data:/mind-travel-client' 
        }
    }
    environment {
        HOME = '.'
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install'
                sh 'npm run build' 
                // sh 'cp -R ./build /mind-travel-client-prod-build'
                // sh 'npm install -g serve'
                // sh 'nohup serve -s build &'
            }
        }
    }
}
