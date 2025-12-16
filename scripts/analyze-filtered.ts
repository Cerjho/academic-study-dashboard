import * as fs from 'fs';
import * as path from 'path';

const rawDataPath = path.join(__dirname, '../src/data/realRespondents.json');
const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf-8'));

console.log('Total responses in file:', rawData.length);
console.log('\nFiltered out responses:');

let filtered = 0;

// Check for invalid emails
const invalidEmails = rawData.filter((r: any) => r['Email Address'].toLowerCase().includes('yourdickismall'));
if (invalidEmails.length > 0) {
  console.log(`\n1. Invalid email addresses (${invalidEmails.length}):`);
  invalidEmails.forEach((r: any) => console.log('   -', r['Email Address']));
  filtered += invalidEmails.length;
}

// Check for long essays
const longAnswers = rawData.filter((r: any) => r['  In what way does it affect you? (Short answer)'].length > 500);
if (longAnswers.length > 0) {
  console.log(`\n2. Long essay responses > 500 chars (${longAnswers.length}):`);
  longAnswers.forEach((r: any) => console.log('   -', r['Email Address'], `(${r['  In what way does it affect you? (Short answer)'].length} chars)`));
  filtered += longAnswers.length;
}

// Check duplicates
const emailCounts = new Map<string, number>();
rawData.forEach((r: any) => {
  const email = r['Email Address'].toLowerCase();
  emailCounts.set(email, (emailCounts.get(email) || 0) + 1);
});

const duplicates = Array.from(emailCounts.entries()).filter(([_, count]) => count > 1);
if (duplicates.length > 0) {
  console.log(`\n3. Duplicate emails (${duplicates.length} emails with duplicates):`);
  duplicates.forEach(([email, count]) => console.log(`   - ${email}: ${count} responses`));
}

// Count valid after filtering
const valid = rawData.filter((r: any) => {
  const email = r['Email Address'].toLowerCase();
  const answer = r['  In what way does it affect you? (Short answer)'];
  if (email.includes('yourdickismall')) return false;
  if (answer.length > 500) return false;
  if (answer.toLowerCase().includes('nothing, at first glance')) return false;
  return true;
});

console.log(`\n--- Summary ---`);
console.log(`Total responses: ${rawData.length}`);
console.log(`Valid responses: ${valid.length}`);
console.log(`After removing duplicates: ${new Set(valid.map((r: any) => r['Email Address'].toLowerCase())).size}`);
