import 'package:flutter/material.dart';
import 'custom_app_bar.dart';  // Ensure this import

class CaseUpdatesScreen extends StatelessWidget {
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
              'Case Updates',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.orange),
            ),
            SizedBox(height: 16),
            _buildCaseUpdate(
              context,
              id: '1',
              category: 'Victim Survivor',
              update: 'Follow-up counseling session scheduled for June 14, 2024, 9:00 AM.',
              status: 'Active',
            ),
            SizedBox(height: 16),
            _buildCaseUpdate(
              context,
              id: '2',
              category: 'Child in Conflict with the Law',
              update: 'Home visit conducted on June 11, 2024. Awaiting assessment results.',
              status: 'Pending',
            ),
            SizedBox(height: 16),
            _buildCaseUpdate(
              context,
              id: '3',
              category: 'Person Who Used Drugs',
              update: 'Monthly counseling session completed on June 10, 2024. Certificate issued to court.',
              status: 'Closed',
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCaseUpdate(BuildContext context, {
    required String id,
    required String category,
    required String update,
    required String status,
  }) {
    return Container(
      padding: EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Color.fromARGB(255, 212, 208, 208),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Case ID: $id - $category:',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 8),
          Text(
            'Update: $update',
            style: TextStyle(fontSize: 14),
          ),
          SizedBox(height: 8),
          Text(
            'Status: $status',
            style: TextStyle(fontSize: 14),
          ),
        ],
      ),
    );
  }
}
