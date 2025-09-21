const icalUrl = "https://api.allorigins.win/raw?url=" +
      encodeURIComponent("https://purdue.brightspace.com/d2l/le/calendar/feed/user/feed.ics?token=ab28t5xk5jmwlg2k54d7a");

    fetch(icalUrl)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.text();
      })
      .then(data => {
        const list = document.getElementById("assignmentsList");
        list.innerHTML = ""; // Clear loading message

        if (!data || !data.includes("BEGIN:VCALENDAR")) {
          throw new Error("Invalid iCal content");
        }

        let assignments = [];

        try {
          const jcalData = ICAL.parse(data);
          if (!jcalData || !Array.isArray(jcalData)) throw new Error("Invalid jCal structure");

          const comp = new ICAL.Component(jcalData);
          const events = comp.getAllSubcomponents("vevent");

          events.forEach(event => {
            try {
              const summary = event.getFirstPropertyValue("summary");
              const dtstart = event.getFirstPropertyValue("dtstart");
              if (!dtstart) return;
              const dueDate = dtstart.toJSDate();
              assignments.push({ summary, dueDate });
            } catch (err) {
              console.warn("Skipping event due to parse error:", err);
            }
          });
        } catch (err) {
          console.error("Error parsing calendar data:", err);
          list.innerHTML = `<li>Error parsing calendar data: ${err.message}</li>`;
          return;
        }

        // Filter out past events
        const now = new Date();
        assignments = assignments.filter(a => a.dueDate >= now);

        // Sort by date
        assignments.sort((a, b) => a.dueDate - b.dueDate);

        // Display in the <ul>
        if (assignments.length === 0) {
          list.innerHTML = "<li>No upcoming assignments found.</li>";
        } else {
          assignments.forEach(a => {
            const li = document.createElement("li");
            li.textContent = `${a.summary} — due ${a.dueDate.toLocaleString()}`;
            list.appendChild(li);
          });
        }
      })
      .catch(err => {
        console.error("Error fetching calendar:", err);
        const list = document.getElementById("assignmentsList");
        list.innerHTML = `<li>Error loading assignments: ${err.message}</li>`;
      });