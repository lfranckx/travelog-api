module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://lachlan@localhost/travelog',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://lachlan@localhost/travelog-test',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '1h',
    awsSecretAccess: process.env.awsSecretAccess || 'aws-secret-access',
    awsAccessKeyId: process.env.awsAccessKeyId || 'aws-key-id',
    awsRegion: process.env.awsRegion || 'aws-region',
    bucket: process.env.bucket || 'bucket'
};