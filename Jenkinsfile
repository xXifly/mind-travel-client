pipeline {
    agent none
    stages{
        stage('Prepare'){
            agent {
                docker {
                    image 'node:alpine' 
                    args '-v mindtravel-client-prod-build:/mindtravel-client-prod-build --name mindtravel-client-prod-jenkins' 
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
                        
                        // sh 'rm -R /mindtravel-client-prod-build/*'
                        sh 'cp -R ./build/* /mindtravel-client-prod-build'
                        
                        // sh 'npm install -g serve'
                        // sh 'nohup serve -s build &'
                    }
                }
            }
        }
        stage('Publish'){
            steps{
                sh 'docker run -p 5000:5000 -v mindtravel-client-prod-build:/mindtravel-client-prod-build --name mindtravel-client-prod'
                sh 'docker exec '
            }
        }
    }
}
