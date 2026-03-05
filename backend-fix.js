// FIXED BACKEND ROUTES

router.post('/register', async (req, res) => {
  try {
    const { name, rollNo, mobile, year, branch, email, college, password, eventId, eventName, transactionId, screenshotUrl, isExistingUser, paymentMethod, coordinator } = req.body;

    if (!eventId || !eventName) {
      return res.status(400).json({ error: 'Event ID and Event Name are required' });
    }

    let hashedPassword = null;

    if (isExistingUser) {
      const existingUser = await sql`
        SELECT password FROM individual_registrations WHERE email = ${email} LIMIT 1
      `;
      if (existingUser.length > 0) {
        hashedPassword = existingUser[0].password;
      } else {
        return res.status(400).json({ error: 'Email not found. Please register as a new user.' });
      }
    } else {
      if (!password) {
        return res.status(400).json({ error: 'Password is required for new registrations' });
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const registration = await sql`
      INSERT INTO individual_registrations (event_id, event_name, name, email, mobile, roll_no, year, branch, college, password, transaction_id, screenshot_url, payment_status, payment_method, coordinator)
      VALUES (${eventId}, ${eventName}, ${name}, ${email}, ${mobile}, ${rollNo}, ${year}, ${branch}, ${college}, ${hashedPassword}, ${transactionId}, ${screenshotUrl}, 'completed', ${paymentMethod || 'upi'}, ${coordinator || null})
      RETURNING *
    `;

    const token = jwt.sign({ email, type: 'individual' }, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });

    res.json({ message: 'Registration successful', token, registration: registration[0] });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/register-team', async (req, res) => {
  try {
    const { teamName, teamLeader, members, eventId, eventName, transactionId, screenshotUrl, isExistingUser, paymentMethod, coordinator } = req.body;

    console.log('Team registration request:', { teamName, memberCount: members?.length, eventId, eventName });
    console.log('Members:', JSON.stringify(members, null, 2));

    const totalMembers = (members?.length || 0) + 1;
    const amount = totalMembers * 100;

    let hashedPassword = null;

    if (isExistingUser) {
      const existingLeader = await sql`
        SELECT leader_password FROM team_registrations WHERE leader_email = ${teamLeader.email} LIMIT 1
      `;
      if (existingLeader.length > 0) {
        hashedPassword = existingLeader[0].leader_password;
      } else {
        const existingIndividual = await sql`
          SELECT password FROM individual_registrations WHERE email = ${teamLeader.email} LIMIT 1
        `;
        if (existingIndividual.length > 0) {
          hashedPassword = existingIndividual[0].password;
        } else {
          return res.status(400).json({ error: 'Email not found. Please register as a new user.' });
        }
      }
    } else {
      if (!teamLeader.password) {
        return res.status(400).json({ error: 'Password is required for new team leaders' });
      }
      hashedPassword = await bcrypt.hash(teamLeader.password, 10);
    }

    const registration = await sql`
      INSERT INTO team_registrations (
        event_id, event_name, team_name,
        leader_name, leader_email, leader_mobile, leader_roll_no, leader_year, leader_branch, leader_college, leader_password,
        member2_name, member2_email, member2_mobile, member2_roll_no, member2_year, member2_branch, member2_college,
        member3_name, member3_email, member3_mobile, member3_roll_no, member3_year, member3_branch, member3_college,
        member4_name, member4_email, member4_mobile, member4_roll_no, member4_year, member4_branch, member4_college,
        transaction_id, screenshot_url, amount, payment_status, payment_method, coordinator
      )
      VALUES (
        ${eventId}, ${eventName}, ${teamName},
        ${teamLeader.name}, ${teamLeader.email}, ${teamLeader.mobile}, ${teamLeader.rollNo}, ${teamLeader.year}, ${teamLeader.branch}, ${teamLeader.college}, ${hashedPassword},
        ${members[0]?.name || null}, ${members[0]?.email || null}, ${members[0]?.mobile || null}, ${members[0]?.rollNo || null}, ${members[0]?.year || null}, ${members[0]?.branch || null}, ${members[0]?.college || null},
        ${members[1]?.name || null}, ${members[1]?.email || null}, ${members[1]?.mobile || null}, ${members[1]?.rollNo || null}, ${members[1]?.year || null}, ${members[1]?.branch || null}, ${members[1]?.college || null},
        ${members[2]?.name || null}, ${members[2]?.email || null}, ${members[2]?.mobile || null}, ${members[2]?.rollNo || null}, ${members[2]?.year || null}, ${members[2]?.branch || null}, ${members[2]?.college || null},
        ${transactionId}, ${screenshotUrl}, ${amount}, 'completed', ${paymentMethod || 'upi'}, ${coordinator || null}
      )
      RETURNING *
    `;

    console.log('Registration successful:', registration[0].id);
    res.json({ message: 'Team registration successful', registration: registration[0] });

  } catch (error) {
    console.error('Team registration error:', error);
    res.status(500).json({ error: error.message });
  }
});
