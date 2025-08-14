// 代码生成时间: 2025-08-14 18:08:45
const fs = require('fs-extra');
# 优化算法效率
const path = require('path');
# 扩展功能模块
const { exec } = require('child_process');

// Configuration for the migration tool
const MIGRATION_DIR = path.join(__dirname, 'migrations');
const MIGRATION_FILES = fs.readdirSync(MIGRATION_DIR).filter(file => file.endsWith('.js'));

// Function to run a migration script
function runMigration(migrationPath) {
  return new Promise((resolve, reject) => {
    exec(`node ${migrationPath}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        console.error('Migration script error: ', stderr);
        reject(new Error(`Migration failed with error: ${stderr}`));
      } else {
        console.log(`Migration ${path.basename(migrationPath)} completed successfully:
${stdout}`);
        resolve(stdout);
# NOTE: 重要实现细节
      }
    });
  });
# 改进用户体验
}

// Function to migrate to the latest version
function migrateLatest() {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if migration directory exists
      if (!fs.existsSync(MIGRATION_DIR)) {
        throw new Error('Migration directory does not exist.');
      }

      // Ensure migrations are in ascending order by name
# 添加错误处理
      MIGRATION_FILES.sort();

      // Run each migration file in sequence
      for (let migrationFile of MIGRATION_FILES) {
        const migrationPath = path.join(MIGRATION_DIR, migrationFile);
# TODO: 优化性能
        await runMigration(migrationPath);
      }

      resolve('Database migration completed successfully.');
    } catch (error) {
      reject(error);
    }
  });
}

// Function to rollback the last migration
# 扩展功能模块
function rollbackLastMigration() {
  return new Promise(async (resolve, reject) => {
    try {
# 增强安全性
      // Get the last migration file
      const lastMigrationFile = MIGRATION_FILES[MIGRATION_FILES.length - 1];
      if (!lastMigrationFile) {
        throw new Error('No migrations to rollback.');
      }

      // Construct the path to the last migration file
      const migrationPath = path.join(MIGRATION_DIR, lastMigrationFile);
      const rollbackMigrationPath = path.join(MIGRATION_DIR, `rollback_${lastMigrationFile}`);

      // Check if rollback migration exists
      if (!fs.existsSync(rollbackMigrationPath)) {
        throw new Error(`Rollback migration for ${lastMigrationFile} does not exist.`);
      }

      // Run the rollback migration script
      await runMigration(rollbackMigrationPath);
# 增强安全性

      resolve('Last migration rolled back successfully.');
    } catch (error) {
      reject(error);
    }
# NOTE: 重要实现细节
  });
}

// Export the migration functions
# 添加错误处理
module.exports = {
  migrateLatest,
  rollbackLastMigration
};