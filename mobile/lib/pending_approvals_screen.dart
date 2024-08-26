import 'package:flutter/material.dart';
import 'custom_app_bar.dart'; // Ensure this import

class PendingApprovalsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'Daily Status Updates',
        hasNotifications: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Pending Approvals',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.orange),
            ),
            SizedBox(height: 16),
            Expanded(
              child: ListView(
                children: [
                  _buildApprovalItem(
                    context,
                    caseId: 'Case ID 412 - Person Who Used Drugs',
                    description:
                        'Monthly progress report submitted on June 10, 2024. Awaiting admin approval.',
                  ),
                  _buildApprovalItem(
                    context,
                    caseId: 'Case ID 308 - Child in Conflict with the Law',
                    description:
                        'Initial intake and assessment submitted on June 11, 2024. Awaiting admin approval.',
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildApprovalItem(BuildContext context,
      {required String caseId, required String description}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Container(
        padding: EdgeInsets.all(16.0),
        decoration: BoxDecoration(
          color: Color.fromARGB(255, 212, 208, 208),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              caseId,
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            Text(
              description,
              style: TextStyle(fontSize: 16),
            ),
          ],
        ),
      ),
    );
  }
}
