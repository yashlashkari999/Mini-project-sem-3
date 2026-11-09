"""
SkillBarter Campus - Full-Stack Local Server
Compatible with Python 3.4+ through Python 3.13+
Provides both static file serving for the React frontend and a full REST API for Time-Banking Credit Ledger operations.
Run directly using: python server.py or py server.py
"""

import http.server
import socketserver
import json
import os
import urllib.parse
from datetime import datetime

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

# Ensure current working directory is this script's directory for Python 3.4 compatibility
os.chdir(DIRECTORY)

# IN-MEMORY DATABASE STATE (Initialized with realistic campus data)
DATA = {
    "users": [
        {
            "id": "usr_aarav",
            "name": "Aarav Sharma",
            "email": "aarav.sharma@campus.edu",
            "major": "Computer Science",
            "gradYear": "2025",
            "avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
            "bio": "Senior CS student passionate about full-stack web dev, Python algorithms, and competitive programming. Eager to pick up acoustic guitar and Spanish conversational skills!",
            "creditBalance": 4,
            "rating": 4.9,
            "reviewsCount": 14,
            "sessionsTaught": 8,
            "sessionsLearned": 4,
            "badges": ["Top Mentor", "Code Wizard", "Punctual Scholar"]
        },
        {
            "id": "usr_elena",
            "name": "Elena Rostova",
            "email": "elena.rostova@campus.edu",
            "major": "Fine Arts & Digital Media",
            "gradYear": "2026",
            "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
            "bio": "Junior specializing in UI/UX in Figma and 3D sculpting in Blender. Wanting to learn fundamental Data Structures and French conversation.",
            "creditBalance": 3,
            "rating": 5.0,
            "reviewsCount": 11,
            "sessionsTaught": 6,
            "sessionsLearned": 3,
            "badges": ["Design Master", "Community Star"]
        },
        {
            "id": "usr_marcus",
            "name": "Marcus Chen",
            "email": "marcus.chen@campus.edu",
            "major": "Business Analytics & Finance",
            "gradYear": "2027",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            "bio": "Sophomore helping peers with Financial Modeling, Advanced Excel, and Macroeconomics. Looking for personal fitness guidance and Python automation basics.",
            "creditBalance": 2,
            "rating": 4.8,
            "reviewsCount": 8,
            "sessionsTaught": 4,
            "sessionsLearned": 2,
            "badges": ["Finance Whiz", "Consistent Helper"]
        },
        {
            "id": "usr_priya",
            "name": "Priya Patel",
            "email": "priya.patel@campus.edu",
            "major": "Linguistics & Pre-Med",
            "gradYear": "2026",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            "bio": "Fluent in Spanish & Hindi. Tutoring General Biology and Organic Chem. Excited to learn video editing for my campus medical club!",
            "creditBalance": 5,
            "rating": 4.95,
            "reviewsCount": 19,
            "sessionsTaught": 12,
            "sessionsLearned": 7,
            "badges": ["Polyglot", "Top Academic Tutor"]
        }
    ],
    "skills": [
        {
            "id": "sk_1",
            "userId": "usr_aarav",
            "userName": "Aarav Sharma",
            "userAvatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
            "userMajor": "Computer Science",
            "userRating": 4.9,
            "type": "teaching",
            "title": "Full-Stack Web Development with React & Tailwind",
            "category": "Programming & Tech",
            "level": "Intermediate to Advanced",
            "description": "Learn modern React hooks, state management, component architecture, and responsive Tailwind styling. I will walk you through building a real mini-project from scratch.",
            "location": "Engineering Computer Lab 3 / Online",
            "availability": "Tuesday & Thursday afternoons, Weekends",
            "creditsCost": 1,
            "createdAt": "2026-10-28T14:30:00Z"
        },
        {
            "id": "sk_2",
            "userId": "usr_elena",
            "userName": "Elena Rostova",
            "userAvatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
            "userMajor": "Fine Arts & Digital Media",
            "userRating": 5.0,
            "type": "teaching",
            "title": "Figma UI/UX Prototyping & Design Systems",
            "category": "Design & Arts",
            "level": "All Levels",
            "description": "Master wireframing, interactive micro-animations, typography, and building reusable design system components in Figma. Perfect for app and web projects!",
            "location": "Design Studio B or Campus Quad Cafe",
            "availability": "Monday & Wednesday 4:00 PM - 7:00 PM",
            "creditsCost": 1,
            "createdAt": "2026-10-29T10:15:00Z"
        },
        {
            "id": "sk_3",
            "userId": "usr_priya",
            "userName": "Priya Patel",
            "userAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            "userMajor": "Linguistics & Pre-Med",
            "userRating": 4.95,
            "type": "teaching",
            "title": "Conversational Spanish & Grammar Essentials",
            "category": "Languages",
            "level": "Beginner to Intermediate",
            "description": "Practical daily speaking practice, pronunciation drill, verb conjugations, and cultural context. Great for travel, academic requirements, or personal growth.",
            "location": "Main University Library 2nd Floor Quiet Zone",
            "availability": "Weekday mornings 9:00 AM - 11:30 AM",
            "creditsCost": 1,
            "createdAt": "2026-10-30T16:00:00Z"
        },
        {
            "id": "sk_4",
            "userId": "usr_marcus",
            "userName": "Marcus Chen",
            "userAvatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            "userMajor": "Business Analytics & Finance",
            "userRating": 4.8,
            "type": "teaching",
            "title": "Advanced Microsoft Excel & Financial Modeling",
            "category": "Academic & Tutoring",
            "level": "Intermediate",
            "description": "VLOOKUP/XLOOKUP, INDEX-MATCH, Pivot Tables, dynamic charts, and financial DCF models for business and economics courses.",
            "location": "Business School Atrium / Discord",
            "availability": "Friday afternoons & Saturday",
            "creditsCost": 1,
            "createdAt": "2026-11-01T11:20:00Z"
        }
    ],
    "ledger": [
        {
            "id": "tx_101",
            "userId": "usr_aarav",
            "type": "credit_bonus",
            "amount": 3,
            "description": "Welcome Time-Bank Grant for Campus Verification",
            "partnerName": "SkillBarter Campus Network",
            "sessionId": "SYS-WELCOME",
            "timestamp": "2026-10-20T08:00:00Z",
            "balanceAfter": 3,
            "status": "settled"
        },
        {
            "id": "tx_102",
            "userId": "usr_aarav",
            "type": "credit_earned",
            "amount": 1,
            "description": "Taught 'Python Basics & Algorithms' to Marcus Chen",
            "partnerName": "Marcus Chen",
            "sessionId": "ses_901",
            "timestamp": "2026-10-25T16:30:00Z",
            "balanceAfter": 4,
            "status": "settled"
        }
    ],
    "sessions": []
}

class SkillBarterHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/status":
            self.send_json_response({"status": "online", "platform": "SkillBarter Campus", "version": "1.0"})
            return
        elif path == "/api/users":
            self.send_json_response(DATA["users"])
            return
        elif path == "/api/skills":
            self.send_json_response(DATA["skills"])
            return
        elif path == "/api/ledger":
            self.send_json_response(DATA["ledger"])
            return
        elif path == "/api/sessions":
            self.send_json_response(DATA["sessions"])
            return

        # Serve static files (index.html, etc.) from current directory
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        content_len = int(self.headers.get("Content-Length", 0))
        post_body = self.rfile.read(content_len) if content_len > 0 else b"{}"
        try:
            payload = json.loads(post_body.decode("utf-8"))
        except Exception:
            payload = {}

        now_iso = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")

        if path == "/api/skills/create":
            new_skill = {
                "id": "sk_" + str(len(DATA["skills"]) + 1),
                "createdAt": now_iso
            }
            new_skill.update(payload)
            DATA["skills"].insert(0, new_skill)
            self.send_json_response(new_skill, status_code=201)
            return

        elif path == "/api/sessions/book":
            new_session = {
                "id": "ses_" + str(len(DATA["sessions"]) + 1),
                "status": "pending",
                "createdAt": now_iso
            }
            new_session.update(payload)
            DATA["sessions"].insert(0, new_session)
            self.send_json_response(new_session, status_code=201)
            return

        elif path == "/api/sessions/complete":
            session_id = payload.get("sessionId")
            rating = payload.get("rating", 5)
            review = payload.get("review", "Great session!")
            
            # Find session
            session = None
            for s in DATA["sessions"]:
                if s["id"] == session_id:
                    session = s
                    break

            if not session:
                self.send_json_response({"error": "Session not found"}, status_code=404)
                return

            teacher_id = session.get("teacherId")
            learner_id = session.get("learnerId")
            
            teacher = None
            learner = None
            for u in DATA["users"]:
                if u["id"] == teacher_id:
                    teacher = u
                if u["id"] == learner_id:
                    learner = u

            if not teacher or not learner:
                self.send_json_response({"error": "Participants not found"}, status_code=400)
                return

            if learner.get("creditBalance", 0) < 1:
                self.send_json_response({"error": "Learner has insufficient credits"}, status_code=400)
                return

            # Execute Time-Banking Transfer
            teacher["creditBalance"] += 1
            teacher["sessionsTaught"] = teacher.get("sessionsTaught", 0) + 1
            learner["creditBalance"] -= 1
            learner["sessionsLearned"] = learner.get("sessionsLearned", 0) + 1

            session["status"] = "completed"
            session["completedAt"] = now_iso
            session["ratingGiven"] = rating
            session["reviewText"] = review

            # Double-entry ledger
            DATA["ledger"].insert(0, {
                "id": "tx_" + str(len(DATA["ledger"]) + 1),
                "userId": teacher_id,
                "type": "credit_earned",
                "amount": 1,
                "description": "Taught '{0}' to {1}".format(session.get("skillTitle", "Skill"), learner.get("name")),
                "partnerName": learner.get("name"),
                "sessionId": session_id,
                "timestamp": now_iso,
                "balanceAfter": teacher["creditBalance"],
                "status": "settled"
            })

            DATA["ledger"].insert(0, {
                "id": "tx_" + str(len(DATA["ledger"]) + 2),
                "userId": learner_id,
                "type": "credit_spent",
                "amount": -1,
                "description": "Learned '{0}' from {1}".format(session.get("skillTitle", "Skill"), teacher.get("name")),
                "partnerName": teacher.get("name"),
                "sessionId": session_id,
                "timestamp": now_iso,
                "balanceAfter": learner["creditBalance"],
                "status": "settled"
            })

            self.send_json_response({"success": True, "session": session})
            return

        self.send_json_response({"error": "Endpoint not found"}, status_code=404)

    def send_json_response(self, data, status_code=200):
        response_bytes = json.dumps(data, indent=2).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(response_bytes)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(response_bytes)

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    server_address = ("", PORT)
    with socketserver.TCPServer(server_address, SkillBarterHandler) as httpd:
        print("=" * 65)
        print("SkillBarter Campus - Full-Stack Time-Banking Platform")
        print("Server is live at: http://localhost:{0}".format(PORT))
        print("Serving directory: {0}".format(DIRECTORY))
        print("Press Ctrl+C in terminal to stop server")
        print("=" * 65)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server cleanly...")

if __name__ == "__main__":
    run_server()
