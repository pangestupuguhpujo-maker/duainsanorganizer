import { hashPassword, verifyPassword } from '../src/server/auth/password';
import { createLead, getLeadById, updateLeadStatus, getLeadsPaginated } from '../src/server/repositories/lead.repo';
import { consultationSchema } from '../src/schemas/consultation.schema';

async function runTests() {
  console.log('=== STARTING UNIT & INTEGRATION TESTS ===\n');

  // TEST SUITE 1: ARGON2ID PASSWORD SECURITY
  console.log('--- Test Suite 1: Argon2id Password Security ---');
  const password = 'VerySecureAdminPassword2026!';
  const hash1 = await hashPassword(password);
  const hash2 = await hashPassword(password);

  // 1.1 Verify hash format
  if (!hash1.startsWith('$argon2id$')) {
    throw new Error('FAILED: Hash format is not Argon2id: ' + hash1);
  }
  console.log('✓ Argon2id prefix verified ($argon2id$)');

  // 1.2 Verify unique salts
  if (hash1 === hash2) {
    throw new Error('FAILED: Argon2id produced identical hashes (missing random salt!)');
  }
  console.log('✓ Random salt verified (distinct hashes generated)');

  // 1.3 Verify valid password
  const isValid = await verifyPassword(hash1, password);
  if (!isValid) {
    throw new Error('FAILED: Correct password failed verification');
  }
  console.log('✓ Correct password verified successfully');

  // 1.4 Verify invalid password
  const isInvalid = await verifyPassword(hash1, 'WrongPassword123');
  if (isInvalid) {
    throw new Error('FAILED: Wrong password passed verification');
  }
  console.log('✓ Wrong password rejected safely');

  // 1.5 Verify malformed hash handling
  const isMalformedSafe = await verifyPassword('not-a-valid-hash', password);
  if (isMalformedSafe) {
    throw new Error('FAILED: Malformed hash did not fail safely');
  }
  console.log('✓ Malformed hash handled safely without throwing');

  // TEST SUITE 2: LEAD SYSTEM END-TO-END WORKFLOW
  console.log('\n--- Test Suite 2: Lead / Consultation System ---');

  // 2.1 Schema validation
  const validData = {
    fullName: 'Test Calon Pengantin',
    whatsappNumber: '081299887766',
    email: 'calon@example.com',
    eventDate: '2026-11-20',
    venueLocation: 'Gedung Arsip Nasional',
    city: 'Jakarta Barat',
    guestCountEstimate: 350,
    preferredContactMethod: 'WHATSAPP' as const,
    consent: true,
  };

  const parsed = consultationSchema.safeParse(validData);
  if (!parsed.success) {
    throw new Error('FAILED: Valid lead data failed validation: ' + JSON.stringify(parsed.error.issues));
  }
  console.log('✓ Consultation schema validates correct input');

  // 2.2 Honeypot check
  const spamData = {
    ...validData,
    website_trap: 'http://spam-link.com',
  };
  const spamParsed = consultationSchema.safeParse(spamData);
  if (spamParsed.data?.website_trap !== 'http://spam-link.com') {
    throw new Error('FAILED: Honeypot field not captured');
  }
  console.log('✓ Anti-spam honeypot field recognized');

  // 2.3 DB Persistence
  const createdLead = await createLead({
    fullName: validData.fullName,
    whatsappNumber: validData.whatsappNumber,
    email: validData.email,
    eventDate: validData.eventDate,
    venueLocation: validData.venueLocation,
    city: validData.city,
    guestCountEstimate: validData.guestCountEstimate,
    preferredContactMethod: validData.preferredContactMethod,
  });

  if (!createdLead || createdLead.status !== 'NEW') {
    throw new Error('FAILED: Lead creation in database failed');
  }
  console.log('✓ Lead created in database with initial status "NEW" (ID:', createdLead.id, ')');

  // 2.4 Status Update & Admin Notes
  const updatedLead = await updateLeadStatus(
    createdLead.id,
    'CONTACTED',
    'Sudah dihubungi via WA, menunggu konfirmasi waktu temu.'
  );

  if (!updatedLead || updatedLead.status !== 'CONTACTED' || !updatedLead.adminNotes) {
    throw new Error('FAILED: Lead status update failed');
  }
  console.log('✓ Lead status updated to "CONTACTED" with internal admin notes');

  // 2.5 Query retrieval and pagination
  const leadInDb = await getLeadById(createdLead.id);
  if (!leadInDb || leadInDb.fullName !== validData.fullName) {
    throw new Error('FAILED: Failed to retrieve lead by ID');
  }
  console.log('✓ Lead retrieved accurately from database');

  const paginated = await getLeadsPaginated({ status: 'CONTACTED' });
  const found = paginated.items.some((i) => i.id === createdLead.id);
  if (!found) {
    throw new Error('FAILED: Lead not found in paginated filtered query');
  }
  console.log('✓ Paginated status filter correctly includes updated lead');

  console.log('\n=== ALL TESTS PASSED SUCCESSFULLY! ===\n');
}

runTests().catch((err) => {
  console.error('\nTEST SUITE FAILED:', err);
  process.exit(1);
});
