import 'package:flutter/material.dart';
import 'custom_app_bar.dart';

class CaseListScreen extends StatelessWidget {
  final String category;
  final void Function(Map<String, dynamic>) onAddCase;

  CaseListScreen({required this.category, required this.onAddCase});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(title: category),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(flex: 1, child: Text('Case No.', style: TextStyle(fontWeight: FontWeight.bold))),
                Expanded(flex: 3, child: Text('Case Description', style: TextStyle(fontWeight: FontWeight.bold))),
                Expanded(flex: 2, child: Text('Case status', style: TextStyle(fontWeight: FontWeight.bold))),
                Expanded(flex: 2, child: Text('Activity', style: TextStyle(fontWeight: FontWeight.bold))),
                Expanded(flex: 1, child: Text('View Case', style: TextStyle(fontWeight: FontWeight.bold))),
              ],
            ),
            Expanded(
              child: ListView(
                children: [
                  _buildCaseRow('01', 'Case Description', 'In Progress', '4/02/24'),
                  _buildCaseRow('02', 'Case Description', 'Active', '4/02/24'),
                  _buildCaseRow('03', 'Case Description', 'Pending', '4/02/24'),
                  _buildCaseRow('04', 'Case Description', 'Upcoming', '4/02/24'),
                  _buildCaseRow('05', 'Case Description', 'Overdue', '4/02/24'),
                ],
              ),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Navigate to Add Case Screen
                Navigator.pushNamed(context, '/add-case');
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.grey[300],
                padding: EdgeInsets.symmetric(horizontal: 40, vertical: 20),
                textStyle: TextStyle(fontSize: 18),
              ),
              child: Text('ADD CASE', style: TextStyle(color: Colors.black)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCaseRow(String caseNo, String description, String status, String activityDate) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 8),
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Color.fromARGB(255, 212, 208, 208),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(flex: 1, child: Text(caseNo)),
          Expanded(flex: 3, child: Text(description)),
          Expanded(flex: 2, child: Text(status)),
          Expanded(flex: 2, child: Text(activityDate)),
          Expanded(
            flex: 1,
            child: IconButton(
              icon: Icon(Icons.info, color: Colors.orange),
              onPressed: () {
                // Handle view case details
              },
            ),
          ),
        ],
      ),
    );
  }
}
