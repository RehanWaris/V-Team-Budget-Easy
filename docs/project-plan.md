diff --git a/docs/project-plan.md b/docs/project-plan.md
new file mode 100644
index 0000000000000000000000000000000000000000..c18caac31ef1873266977d2c04354768ff5dd00d
--- /dev/null
+++ b/docs/project-plan.md
@@ -0,0 +1,159 @@
+# V-Budget Project Plan
+
+## 1. Vision & Goals
+V-Budget is a responsive web application that enables Voiceworx employees to rapidly build, review, and approve event budgets with minimal friction. The platform must streamline vendor rate management, automate cost sheet generation from client briefs, and enforce a multi-step approval workflow (User → Rehan → Accounts → User). The UI should feel modern, slick, and accessible, using a blue, black, and white palette.
+
+## 2. User Roles & Access Control
+- **Requester (Employee):**
+  - Register and sign in using email + password or OTP.
+  - Request OTP approval from Rehan before their account becomes active.
+  - Upload briefs/element sheets, draft budgets, add/edit vendors (OTP-gated).
+- **Rehan (Primary Approver):**
+  - Approve employee registrations, new vendors, vendor rate updates, and budget submissions.
+  - Configure platform defaults (item glossary, tax rules, OTP recipients).
+- **Accounts Team:**
+  - Review Rehan-approved budgets for financial compliance.
+  - Return budgets with comments or mark as verified.
+- **Administrators (subset of Rehan/Accounts):**
+  - Manage system settings, role assignments, audit logs, and notification preferences.
+
+Role-based access control (RBAC) and fine-grained permissions will be implemented via a centralized authorization module. Audit trails will capture every sensitive action (uploads, approvals, rate changes) for compliance.
+
+## 3. Core Modules
+1. **Authentication & Authorization**
+   - Email/password login with password hashing.
+   - OTP flow for new users and for sensitive actions (e.g., adding a vendor) with OTPs routed to `rehan@voiceworx.in` for validation.
+   - Optional MFA-ready design for future enhancements.
+
+2. **Vendor Management**
+   - Catalog of vendors categorized by service type (Sound, Light, Fabrication, Flex, etc.).
+   - Vendor creation/update flows require OTP confirmation before rate details unlock.
+   - Rate cards include item name (with auto-complete from an Indian event glossary), description, units (per piece, per sq. ft, per day/hour), base rate, optional setup charges, minimum quantities, and notes.
+   - Submissions trigger approval workflow (Pending → Approved → Archived) with comment threads and document uploads.
+
+3. **Budget Creation & Cost Sheet Automation**
+   - Intake wizard: upload client brief (Word/PDF) and element sheet (Excel), plus metadata (client, event type, dates, location, number of days, remarks).
+   - Parsing services ingest Excel data to pre-fill a spreadsheet-like UI with itemized costs using approved vendor rates.
+   - Manual override allowed with change tracking (highlighted cells, approval flags).
+   - Cost calculations include:
+     - Subtotals per category.
+     - **Agency Fees (%)** applied immediately after the first total.
+     - **19% GST** applied on the total inclusive of agency fees.
+     - Margin insights and profitability indicators.
+   - Inline comments, attachments, and export options (Excel, Google Sheets, PDF).
+
+4. **Approval Workflow**
+   - Stage tracker: Draft → Pending Rehan → Pending Accounts → Approved → Returned.
+   - Approvers can approve, request changes, or add notes.
+   - Notifications (email/in-app) for each transition.
+   - Audit log view showing timestamps, actors, and decisions.
+
+5. **Reporting & Analytics**
+   - Dashboards for spend by category, vendor utilization, approval times.
+   - Downloadable reports (CSV/PDF) for management review.
+   - Future-ready hooks for comparing estimated vs. actual spend.
+
+6. **Settings & Glossary**
+   - Manage the catalog of default items/terminology tailored to Indian event production.
+   - Configure tax rules, agency fee defaults, approval routing, and notification templates.
+
+## 4. System Architecture
+- **Frontend:** Next.js (React + TypeScript) with Tailwind CSS for rapid, consistent UI that adheres to the blue/black/white theme. Component library built around cards, tables, modals, drawers, and wizards. React Query (or SWR) for data fetching/state synchronization.
+- **Backend:** Node.js (TypeScript) with NestJS or Express + modular architecture. RESTful API (with option to add GraphQL later). Services:
+  - Authentication service (JWT sessions + OTP).
+  - Vendor service.
+  - Budget service (including document parsing and cost calculations).
+  - Approval service.
+  - Notification service.
+- **Database:** PostgreSQL hosted on a managed service. Schema includes Users, Roles, Vendors, VendorItems, Budgets, BudgetItems, Approvals, Documents, AuditLogs.
+- **Storage:** S3-compatible object storage for uploaded briefs, element sheets, and vendor documents.
+- **File Processing:** Serverless worker (e.g., AWS Lambda) or background job processor (BullMQ/Redis) for document parsing and Excel generation.
+- **Security:** TLS everywhere, encrypted secrets storage, strict validation, rate limiting for OTP endpoints.
+
+## 5. Data Model Overview
+- **User** (`id`, `name`, `email`, `phone`, `password_hash`, `role`, `status`, `created_at`).
+- **OTPRequest** (`id`, `user_id`, `purpose`, `token`, `expires_at`, `consumed`).
+- **Vendor** (`id`, `name`, `category`, `contact`, `gst_number`, `city`, `status`, `created_by`, `approved_by`).
+- **VendorItem** (`id`, `vendor_id`, `item_name`, `description`, `unit`, `rate`, `min_qty`, `setup_charge`, `notes`, `status`).
+- **Budget** (`id`, `client_name`, `event_name`, `event_type`, `location`, `start_date`, `end_date`, `days`, `prepared_by`, `status`, `agency_fee_rate`, `gst_rate`, `total_without_fees`, `agency_fee_total`, `gst_total`, `grand_total`).
+- **BudgetItem** (`id`, `budget_id`, `category`, `item_name`, `vendor_id`, `rate`, `quantity`, `unit`, `days`, `subtotal`, `override_flag`).
+- **Approval** (`id`, `budget_id`, `stage`, `approver_id`, `decision`, `comments`, `timestamp`).
+- **Document** (`id`, `entity_type`, `entity_id`, `file_name`, `file_url`, `uploaded_by`, `uploaded_at`).
+- **AuditLog** (`id`, `actor_id`, `action`, `entity_type`, `entity_id`, `metadata`, `created_at`).
+
+## 6. Key Workflows
+1. **User Registration & Activation**
+   1. Employee submits registration form.
+   2. OTP sent to `rehan@voiceworx.in` for approval.
+   3. Rehan enters OTP to activate the account.
+   4. Employee gains access to dashboard.
+
+2. **Vendor Onboarding**
+   1. Employee selects “Add Vendor”.
+   2. OTP requested (sent to Rehan); until OTP is validated, rate card form remains locked.
+   3. Employee fills vendor basics, uploads rate card items, submits for approval.
+   4. Rehan reviews details, approves or returns with feedback.
+   5. Approved vendor becomes available in budgeting module.
+
+3. **Budget Preparation & Approval**
+   1. Employee uploads brief and element sheet, enters metadata.
+   2. System parses element sheet, auto-fills cost table using approved vendor rates.
+   3. Employee adjusts quantities/rates; agency fee (%) applied to first total, followed by 19% GST on the updated total.
+   4. Employee submits budget; Rehan reviews and approves/returns.
+   5. Approved budget flows to Accounts for final verification.
+   6. Accounts approves or returns with comments.
+   7. Finalized budget is available for download and client communication.
+
+4. **Notifications & Audit**
+   - Email notifications at each approval step.
+   - In-app notification center summarizing pending tasks.
+   - Audit trail accessible to admins for compliance reviews.
+
+## 7. UI & UX Guidelines
+- **Theme:** Dominant blues (primary actions), black for typography, white backgrounds with subtle grey separators.
+- **Layout Patterns:**
+  - Dashboard with metric cards and activity feed.
+  - Multi-step wizards for complex flows (registration, vendor onboarding, budget creation).
+  - Side drawers for quick edits and approvals.
+  - Tables with sticky headers, filters, and responsive design.
+- **Accessibility:** WCAG-compliant color contrast, keyboard-friendly controls, descriptive aria labels.
+- **Feedback:** Toasts for quick success/error messages, inline validation, status chips (Pending, Approved, Returned).
+
+## 8. Implementation Roadmap
+1. **Foundation**
+   - Initialize monorepo (frontend + backend) with shared TypeScript configs.
+   - Set up PostgreSQL schema migrations and seed data for glossary.
+   - Implement authentication service with OTP workflow.
+
+2. **Vendor Module**
+   - Build vendor CRUD APIs with approval gating.
+   - Create frontend interfaces (list, detail, add/edit drawer).
+
+3. **Budget Module**
+   - Develop budget data models and APIs.
+   - Implement document upload & parsing pipeline.
+   - Build spreadsheet UI with calculation engine (including agency fee & 19% GST).
+
+4. **Approval & Notifications**
+   - Workflow engine controlling transitions and notifications.
+   - Approval UI components and comment threads.
+
+5. **Reporting & Settings**
+   - Analytics dashboards.
+   - Admin settings for glossary, tax/fee defaults, notification preferences.
+
+6. **Quality & Launch**
+   - Automated testing (unit, integration, E2E), performance tuning, security hardening.
+   - Documentation and training materials for Voiceworx teams.
+
+## 9. Future Enhancements
+- Mobile app leveraging the same API stack.
+- Vendor performance scoring and SLA tracking.
+- Integration with accounting software for actual spend reconciliation.
+- AI-assisted budget recommendations based on past events and vendor performance.
+
+## 10. Next Steps
+- Confirm stack choices and deployment preferences.
+- Kick off repository scaffolding (frontend and backend).
+- Begin with authentication flows and vendor module per roadmap.
+
