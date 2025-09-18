pipeline {
 
    agent any
 
    environment {
 
        CYPRESS_baseUrl = 'https://opensource-demo.orangehrmlive.com'
 
    }
 
    stages {
 
        stage('Checkout Code') {
 
            steps {
 
                checkout scm
 
            }
 
        }
 
        stage('Install Dependencies') {
 
            steps {
 
                bat 'npm install'
 
                bat 'npx cypress install'
 
            }
 
        }
 
        stage('Run Cypress Tests') {
 
            steps {
 
                bat 'npx cypress run --spec cypress/e2e/both/*'
 
            }
 
        }
 
        stage('Archive Results') {
 
            steps {
 
                // Archive the specific new report files
 
                archiveArtifacts artifacts: 'cypress/reports/mochawesome_*.html, cypress/reports/mochawesome_*.json', allowEmptyArchive: true
 
                archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true
 
                archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true
 
            }
 
        }
 
    }
 
    post {
 
        always {
 
            // Publish the LATEST HTML report (use wildcard pattern)
 
            publishHTML target: [
 
                allowMissing: true,
 
                alwaysLinkToLastBuild: true,
 
                keepAll: true,
 
                reportDir: 'cypress/reports',
 
                reportFiles: 'mochawesome_*.html',  // Changed to wildcard
 
                reportName: 'Cypress Test Report',
 
                reportTitles: 'OrangeHRM Login Test Report'
 
            ]
 
            // Optional: Keep workspace for debugging
 
            // cleanWs()
 
        }
 
        success {
 
            echo 'Tests completed successfully! ✅'
 
            // Display the actual report filename
 
            bat 'dir cypress\\reports\\*.html'
 
        }
 
        failure {
 
            echo 'Tests failed! ❌ Check the reports for details.'
 
        }
 
    }
 
}